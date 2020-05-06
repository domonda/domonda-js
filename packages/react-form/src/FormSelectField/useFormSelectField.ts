/**
 *
 * FormSelectField/useFormSelectField
 *
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';

export type FormSelectFieldValidate = FormFieldValidate<string | null>;

export interface UseFormSelectFieldProps extends UseFormFieldProps<string | null> {
  required?: boolean;
}

export interface FormSelectFieldAPI extends FormFieldAPI<string | null> {
  selectProps: {
    name: string;
    value: string;
    required: boolean | undefined;
    disabled: boolean;
    readOnly: boolean;
    ref: (element: HTMLSelectElement | null) => void;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
  };
}

export function useFormSelectField(props: UseFormSelectFieldProps): FormSelectFieldAPI {
  const { required, ...formFieldProps } = props;
  const formField = useFormField<string | null>(formFieldProps);

  const [selectEl, setSelectEl] = useState<HTMLSelectElement | null>(null);

  const { validityMessage } = formField.state;
  useEffect(() => {
    if (selectEl) {
      selectEl.setCustomValidity(validityMessage || '');
      if (validityMessage) {
        selectEl.reportValidity();
      }
    }
  }, [validityMessage || '']);

  const handleChange = useCallback<React.FormEventHandler<HTMLSelectElement>>(
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
    selectProps: {
      name: formFieldProps.path,
      value: formField.value || '',
      required,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      ref: setSelectEl,
      onChange: handleChange,
    },
  };
}
