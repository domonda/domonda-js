/**
 *
 * FormCheckboxField/useFormCheckboxField
 *
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';

export type FormCheckboxFieldValidate = FormFieldValidate<boolean | null>;

export interface UseFormCheckboxFieldProps extends UseFormFieldProps<boolean | null> {
  required?: boolean;
}

export interface FormCheckboxFieldAPI extends FormFieldAPI<boolean | null> {
  inputProps: {
    type: 'checkbox';
    name: string;
    checked: boolean;
    required: boolean | undefined;
    ref: (element: HTMLInputElement | null) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
}

export function useFormCheckboxField(props: UseFormCheckboxFieldProps): FormCheckboxFieldAPI {
  const { required, ...formFieldProps } = props;
  const formField = useFormField<boolean | null>(formFieldProps);

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
      formField.setValue(currentTarget.checked);

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
      type: 'checkbox',
      name: formFieldProps.path,
      checked: formField.value || false,
      required,
      ref: setInputEl,
      onChange: handleChange,
    },
  };
}
