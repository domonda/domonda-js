/**
 *
 * FormTextAreaField/useFormTextAreaField
 *
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';

export type FormTextAreaFieldValidate = FormFieldValidate<string | null>;

export interface UseFormTextAreaFieldProps extends UseFormFieldProps<string | null> {
  required?: boolean;
}

export interface FormTextAreaFieldAPI extends FormFieldAPI<string | null> {
  textAreaProps: {
    type: 'text';
    name: string;
    value: string;
    required: boolean | undefined;
    disabled: boolean;
    readOnly: boolean;
    ref: (element: HTMLTextAreaElement | null) => void;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  };
}

export function useFormTextAreaField(props: UseFormTextAreaFieldProps): FormTextAreaFieldAPI {
  const { required, ...formFieldProps } = props;
  const formField = useFormField<string | null>(formFieldProps);

  const [textAreaEl, setTextAreaEl] = useState<HTMLTextAreaElement | null>(null);

  const { validityMessage } = formField.state;
  useEffect(() => {
    if (textAreaEl) {
      textAreaEl.setCustomValidity(validityMessage || '');
      if (validityMessage) {
        textAreaEl.reportValidity();
      }
    }
  }, [validityMessage || '']);

  const handleChange = useCallback<React.FormEventHandler<HTMLTextAreaElement>>(
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
    textAreaProps: {
      type: 'text',
      name: formFieldProps.path,
      value: formField.value || '',
      required,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      ref: setTextAreaEl,
      onChange: handleChange,
    },
  };
}
