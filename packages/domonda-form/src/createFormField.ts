/**
 *
 * Form
 *
 */

import { Plumb, shallowEqual } from '@domonda/plumb';
import get from 'lodash/get';
import setWith from 'lodash/fp/setWith';
import clone from 'lodash/fp/clone';
import omit from 'lodash/fp/omit';

// form
import { FormDefaultValues, FormState, FormFieldState } from './Form';
import {
  FormField,
  FormFieldStateWithValues,
  FormFieldConfig,
  FormFieldDispose,
} from './FormField';

function selector<T extends FormDefaultValues, V>(
  path: string,
  state: FormState<T>,
): FormFieldStateWithValues<V> {
  const { fields, defaultValues, values } = state;

  const defaultValue = get(defaultValues, path);
  const value = get(values, path);

  const field: FormFieldState | undefined = fields[path];
  if (!field) {
    return {
      defaultValue,
      value,
      changed: false,
      validityMessage: null,
    };
  }

  return {
    ...field,
    defaultValue,
    value,
  };
}

export function createFormField<DefaultValues extends FormDefaultValues, Value>(
  form: Plumb<FormState<DefaultValues>>,
  path: string, // [K in keyof FormDefaultValues]
  config: FormFieldConfig<Value> = {},
): [FormField<Value>, FormFieldDispose] {
  let defaultValue: Value;
  let value: Value;

  const plumb = form.chain<FormFieldStateWithValues<Value>>({
    selector: (state) => selector(path, state),
    transformer: (selectedState) => ({
      ...selectedState,
      changed: !shallowEqual(selectedState.defaultValue, selectedState.value),
    }),
    updater: (state, { changed, validityMessage, ...rest }) => ({
      ...state,
      values: setWith(clone, path, rest.value, form.state.values),
      fields: {
        ...form.state.fields,
        [path]: {
          validityMessage,
          changed,
        },
      },
    }),
    filter: (selectedState) => {
      const changed =
        !shallowEqual(value, selectedState.value) ||
        !shallowEqual(defaultValue, selectedState.defaultValue);
      defaultValue = selectedState.defaultValue;
      value = selectedState.value;
      return changed;
    },
  });

  plumb.subscribe({
    dispose: () => {
      form.next({
        ...form.state,
        fields: omit(path, form.state.fields),
      });
    },
  });

  const {
    immediateValidate,
    validate,
    //validateDebounce = 0
  } = config;
  if (validate) {
    // let currValue = plumb.state.value; // first try using the value from above
    let counter = 0;
    function performValidate(state: FormFieldStateWithValues<Value>) {
      if (!validate) {
        return;
      }

      // regular synchronous validation
      const pendingValidityMessage = validate(state.value);
      if (!(pendingValidityMessage instanceof Promise)) {
        if (pendingValidityMessage !== state.validityMessage) {
          console.log(1);
          plumb.next({
            ...state,
            validityMessage: pendingValidityMessage,
          });
        }
        return;
      }

      // promise validation

      // we use the counter as a simple cancel mechanism
      const internalCounter = counter;
      counter++;

      if (state.validityMessage !== undefined) {
        plumb.next({ ...state, validityMessage: undefined });
      }
      pendingValidityMessage.then((nextValidityMessage) => {
        // if the internalCounter does not match the outer counter that means that another, newer, validity check is pending
        if (internalCounter + 1 === counter) {
          plumb.next({ ...state, validityMessage: nextValidityMessage });
        }
      });
    }

    if (immediateValidate) {
      performValidate(plumb.state);
    }
    plumb.subscribe((state) => {
      if (!shallowEqual(value, state.value)) {
        performValidate(state);
      }
    });
  }

  return [
    {
      plumb,
      get state() {
        return plumb.state;
      },
      get value() {
        return plumb.state.value;
      },
      setValue: (nextValue) => {
        value = nextValue;
        if (!shallowEqual(plumb.state.value, value)) {
          plumb.next({
            ...plumb.state,
            value: nextValue,
          });
        }
      },
      resetValue: () => {
        defaultValue = plumb.state.defaultValue;
        value = plumb.state.value;
        if (!shallowEqual(value, defaultValue)) {
          plumb.next({
            ...plumb.state,
            value: plumb.state.defaultValue,
          });
        }
      },
    },
    () => plumb.dispose(),
  ];
}
