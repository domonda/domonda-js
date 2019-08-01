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
  FormFieldValidate,
  FormFieldValidityMessage,
} from './FormField';

type Validator<V> = (state: V) => FormFieldValidityMessage;

function makeValidator<V>(
  validate: FormFieldValidate<V>,
  callback: (validityMessage: FormFieldValidityMessage) => void, // used for debounced and async validations
): Validator<V> {
  let counter = 0;

  return function validator(value) {
    // regular synchronous validation
    const pendingValidityMessage = validate(value);
    if (!(pendingValidityMessage instanceof Promise)) {
      callback(pendingValidityMessage);
      return pendingValidityMessage;
    }

    // promise validation

    // we use the counter as a simple cancel mechanism
    const internalCounter = counter;
    counter++;

    pendingValidityMessage.then((nextValidityMessage) => {
      // if the internalCounter does not match the outer counter that means that another, newer, validity check is pending
      if (internalCounter + 1 === counter) {
        callback(nextValidityMessage);
      }
    });

    callback(undefined);
    return undefined;
  };
}

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
  const {
    validate,
    immediateValidate,
    // validateDebounce = 0
  } = config;

  let plumb: Plumb<FormFieldStateWithValues<Value>>;

  let validator: Validator<Value>;
  if (validate) {
    validator = makeValidator<Value>(validate, function asyncValidityMessage(validityMessage) {
      // timeout prevents callstack overflow
      setTimeout(() => {
        if (plumb) {
          const state = plumb.state;
          if (state.validityMessage !== validityMessage) {
            plumb.next({
              ...plumb.state,
              validityMessage,
            });
          }
        }
      }, 0);
    });
  }

  let defaultValue: Value;
  let value: Value;

  let initialTransform = true;
  plumb = form.chain<FormFieldStateWithValues<Value>>({
    selector: (state) => selector(path, state),
    transformer: (selectedState) => {
      const changed = !shallowEqual(selectedState.defaultValue, selectedState.value);

      let validityMessage = selectedState.validityMessage;
      if (validator && (changed || (immediateValidate && initialTransform))) {
        validityMessage = validator(selectedState.value);
      }

      initialTransform = false;
      return {
        ...selectedState,
        changed,
        validityMessage,
      };
    },
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
