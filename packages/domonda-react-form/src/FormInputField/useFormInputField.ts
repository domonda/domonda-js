/**
 *
 * FormInputField/useFormInputField
 *
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';

export type FormInputFieldValidate = FormFieldValidate<string | null>;

export interface UseFormInputFieldProps extends UseFormFieldProps<string | null> {
  required?: boolean;
}

export interface FormInputFieldAPI extends FormFieldAPI<string | null> {
  inputProps: {
    type: 'text';
    name: string;
    value: string;
    required: boolean | undefined;
    disabled: boolean;
    readOnly: boolean;
    ref: (element: HTMLInputElement | null) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
}

export function useFormInputField(props: UseFormInputFieldProps): FormInputFieldAPI {
  const { required, ...formFieldProps } = props;
  const formField = useFormField<string | null>(formFieldProps);

  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);

  const { validityMessage } = formField.state;
  useEffect(() => {
    if (inputEl) {
      inputEl.setCustomValidity(validityMessage || '');
      if (validityMessage) {
        inputEl.reportValidity();
      }
    }
  }, [validityMessage || '']);

  const handleChange = useCallback<React.FormEventHandler<HTMLInputElement>>(
    ({ currentTarget }) => {
      formField.setValue(currentTarget.value || null);

      // we want this asynchronously called because some browsers (safari) decide to hide the validity box on input
      const { validity } = currentTarget;
      if (!validity.valid) {
        const reportValidity = () => currentTarget.reportValidity();
        setTimeout(reportValidity, 0);
      }
    },
    [formField.setValue],
  );

  return {
    ...formField,
    inputProps: {
      type: 'text',
      name: formFieldProps.path,
      value: formField.value || '',
      required,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      ref: setInputEl,
      onChange: handleChange,
    },
  };
}
