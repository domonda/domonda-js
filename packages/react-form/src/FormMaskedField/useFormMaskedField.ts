/**
 *
 * FormMaskedField/useFormMaskedField
 *
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';
import IMask from 'imask';

export type FormMaskedFieldValidate = FormFieldValidate<string | null>;

export type UseFormMaskedFieldProps<V extends string | number> = UseFormFieldProps<V | null> &
  (IMask.MaskedPatternOptions | IMask.MaskedNumberOptions) & {
    required?: boolean;
  };

export interface FormMaskedFieldAPI<V extends string | number> extends FormFieldAPI<V | null> {
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

export function useFormMaskedField<Value extends string | number>(
  props: UseFormMaskedFieldProps<Value>,
): FormMaskedFieldAPI<Value> {
  const {
    // direct
    required,
    // @domonda/form
    path,
    validate,
    immediateValidate,
    transformer,
    // imask
    ...maskedOptions
  } = props;

  // initialize form field
  const formField = useFormField<Value | null>({ path, validate, immediateValidate, transformer });

  // prepare input
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

  // initialize mask
  const maskRef = useRef<IMask.InputMask<typeof maskedOptions> | null>(null);
  useEffect(() => {
    // TODO-db-200512 update mask options on options change
    // if (maskRef.current && maskRef.current.el === inputEl) {
    //   maskRef.current.updateOptions(maskedOptions);
    // }
    if (inputEl) {
      maskRef.current = IMask(inputEl, maskedOptions);
      return () => maskRef.current?.destroy();
    }
  }, [inputEl]);

  // sync form value with mask, is it necessary?
  // useEffect(() => {
  //   if (maskRef.current) {
  //     maskRef.current.value === formField.value ?? '';
  //   }
  // }, [formField.value]);

  const handleChange = useCallback<React.FormEventHandler<HTMLInputElement>>(
    ({ currentTarget }) => {
      if (maskRef.current) {
        formField.setValue((maskRef.current.value ?? null) as Value | null);
      }

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
      name: path,
      value: String(formField.value ?? ''),
      required,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      ref: setInputEl,
      onChange: handleChange,
    },
  };
}
