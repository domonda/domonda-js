/**
 *
 * Form
 *
 */

import { Plumb } from '@domonda/plumb';
import get from 'lodash/get';
import setWith from 'lodash/fp/setWith';
import clone from 'lodash/fp/clone';
import omit from 'lodash/fp/omit';
import { shallowEqual } from 'fast-equals';

// form
import { FormDefaultValues, FormState, FormFieldState } from './Form';
import {
  FormField,
  FormFieldStateWithValues,
  FormFieldConfig,
  FormFieldDispose,
} from './FormField';
import { FormTag } from './FormTag';

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
  form: Plumb<FormState<DefaultValues>, FormTag>,
  path: string, // [K in keyof FormDefaultValues]
  config: FormFieldConfig<Value> = {},
): [FormField<Value>, FormFieldDispose] {
  const { validate, immediateValidate } = config;

  let defaultValue: Value;
  let value: Value;

  let initialTransform = true;
  const plumb = form.chain<FormFieldStateWithValues<Value>>(
    {
      selector: (state) => selector(path, state),
      transformer: (selectedState) => {
        const changed = !shallowEqual(selectedState.defaultValue, selectedState.value);

        let validityMessage = selectedState.validityMessage;
        if (validate && (changed || (immediateValidate && initialTransform))) {
          validityMessage = validate(selectedState.value);
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
    },
    FormTag.CREATE_FIELD,
  );

  plumb.subscribe({
    dispose: () => {
      form.next(
        {
          ...form.state,
          fields: omit(path, form.state.fields),
        },
        FormTag.DISPOSE_FIELD,
      );
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
        if (!shallowEqual(plumb.state.value, nextValue)) {
          value = nextValue;
          plumb.next(
            {
              ...plumb.state,
              value: nextValue,
            },
            FormTag.FIELD_VALUE_CHANGE,
          );
        }
      },
      resetValue: () => {
        if (!shallowEqual(plumb.state.defaultValue, plumb.state.value)) {
          defaultValue = plumb.state.defaultValue;
          value = plumb.state.value;
          plumb.next(
            {
              ...plumb.state,
              value: plumb.state.defaultValue,
            },
            FormTag.FIELD_VALUE_RESET,
          );
        }
      },
    },
    () => plumb.dispose(),
  ];
}
