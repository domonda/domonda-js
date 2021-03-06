/**
 *
 * Form
 *
 */

import { Plumb } from '@domonda/plumb';
import get from 'lodash/get';
import setWith from 'lodash/fp/setWith';
import unset from 'lodash/fp/unset';
import { deepEqual } from 'fast-equals';

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
  const { fields, defaultValues, values, disabled, readOnly } = state;

  const defaultValue = get(defaultValues, path);
  const value = get(values, path);

  const field: FormFieldState | undefined = fields[path];
  if (!field) {
    return {
      defaultValue,
      value,
      changed: false,
      validityMessage: null,
      disabled,
      readOnly,
    };
  }

  return {
    ...field,
    defaultValue,
    value,
    disabled,
    readOnly,
  };
}

export function createFormField<DefaultValues extends FormDefaultValues, Value>(
  form: Plumb<FormState<DefaultValues>, FormTag>,
  path: string, // [K in keyof FormDefaultValues]
  config: FormFieldConfig<Value> = {},
): [FormField<Value>, FormFieldDispose] {
  const { validate, immediateValidate, transformer } = config;

  let disabled = form.state.disabled;
  let readOnly = form.state.readOnly;
  let defaultValue: Value;
  let value: Value;

  let initialTransform = true;
  const plumb = form.chain<FormFieldStateWithValues<Value>>(
    {
      selector: (state) => selector(path, state),
      transformer: (selectedState, tag) => {
        let value = selectedState.value;
        if (transformer) {
          value = transformer(value, tag);
        }

        const changed = !deepEqual(selectedState.defaultValue, value);

        let validityMessage = selectedState.validityMessage;
        if (validate && (changed || (immediateValidate && initialTransform))) {
          validityMessage = validate(value);
        }

        initialTransform = false;
        return {
          ...selectedState,
          value,
          changed,
          validityMessage,
        };
      },
      updater: (state, { changed, validityMessage, ...rest }) => ({
        ...state,
        values:
          rest.value === undefined
            ? state.values
            : setWith(() => undefined, path, rest.value, form.state.values),
        fields: {
          ...form.state.fields,
          [path]: {
            validityMessage,
            changed,
          },
        },
      }),
      filter: (selectedState, tag) => {
        // ignore everything not field related
        switch (tag) {
          case FormTag.SUBMIT_ERROR_RESET:
          case FormTag.CREATE_FIELD:
          case FormTag.DISPOSE_FIELD:
          case FormTag.SUBMIT:
            return false;
        }

        const changed =
          disabled !== selectedState.disabled ||
          readOnly !== selectedState.readOnly ||
          !deepEqual(value, selectedState.value) ||
          !deepEqual(defaultValue, selectedState.defaultValue);

        disabled = selectedState.disabled;
        readOnly = selectedState.readOnly;
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
          fields: unset(path, form.state.fields),
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
        if (!deepEqual(plumb.state.value, nextValue)) {
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
        if (!deepEqual(plumb.state.defaultValue, plumb.state.value)) {
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
