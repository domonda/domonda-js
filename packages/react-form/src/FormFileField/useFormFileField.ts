/**
 *
 * FormFileField/useFormFileField
 *
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';

export type FormFileFieldValidate<V extends File | FileList> = FormFieldValidate<V | null>;

export interface UseFormFileFieldProps<V extends File | FileList>
  extends UseFormFieldProps<V | null> {
  required?: boolean;
  multiple?: boolean;
  accept?: string[];
}

export interface FormFileFieldAPI<V extends File | FileList> extends FormFieldAPI<V | null> {
  inputProps: {
    type: 'file';
    name: string;
    required: boolean | undefined;
    multiple: boolean | undefined;
    accept: string | undefined;
    disabled: boolean;
    readOnly: boolean;
    ref: (element: HTMLInputElement | null) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
}

function hasFiles(inputEl: HTMLInputElement) {
  return (inputEl.files && inputEl.files.length > 0) || false;
}

export function useFormFileField<Value extends File | FileList>(
  props: UseFormFileFieldProps<Value>,
): FormFileFieldAPI<Value> {
  const { required, multiple, accept, ...formFieldProps } = props;
  const formField = useFormField<Value | null>(formFieldProps);

  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);

  // if the field value got emptied, do same for the input (given that it has values)
  useEffect(() => {
    if (!formField.value && inputEl && hasFiles(inputEl)) {
      inputEl.value = '';
    }
  }, [inputEl, formField.value]);

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
      if (multiple) {
        formField.setValue(hasFiles(currentTarget) ? (currentTarget.files as Value) : null);
      } else {
        formField.setValue(hasFiles(currentTarget) ? (currentTarget.files![0] as Value) : null);
      }

      // we want this asynchronously called because some browsers (safari) decide to hide the validity box on input
      const { validity } = currentTarget;
      if (!validity.valid) {
        const reportValidity = () => currentTarget.reportValidity();
        setTimeout(reportValidity, 0);
      }
    },
    [formField.setValue, multiple],
  );

  return {
    ...formField,
    inputProps: {
      type: 'file',
      name: formFieldProps.path,
      required,
      multiple,
      accept: accept && accept.length > 0 ? accept.join(',') : undefined,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      ref: setInputEl,
      onChange: handleChange,
    },
  };
}
