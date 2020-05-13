/**
 *
 * FormMaskedField/useFormMaskedField
 *
 */

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';
import { useForceUpdate } from '@domonda/react-plumb/useForceUpdate';
import IMask from 'imask';

export type FormMaskedFieldValidate<V extends string | null> = FormFieldValidate<V | null>;

export type FormMaskedFieldMaskOptions =
  | IMask.MaskedOptions<IMask.MaskedRegExp>
  | IMask.MaskedNumberOptions;

export type UseFormMaskedFieldProps<V extends string | number> = UseFormFieldProps<V | null> &
  FormMaskedFieldMaskOptions & {
    required?: boolean;
    prefix?: string;
    suffix?: string;
  };

export interface FormMaskedFieldAPI<V extends string | number> extends FormFieldAPI<V | null> {
  inputProps: {
    type: 'text';
    name: string;
    defaultValue: string;
    required: boolean | undefined;
    disabled: boolean;
    readOnly: boolean;
    ref: (element: HTMLInputElement | null) => void;
  };
}

export function useFormMaskedField<Value extends string | number>(
  props: UseFormMaskedFieldProps<Value>,
): FormMaskedFieldAPI<Value> {
  const {
    // direct
    required,
    prefix,
    suffix,
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

  // synchronize validity
  const { validityMessage } = formField.state;
  useEffect(() => {
    if (inputEl) {
      inputEl.setCustomValidity(validityMessage || '');
      if (validityMessage) {
        inputEl.reportValidity();
      }
    }
  }, [validityMessage || '']);

  // create mask for value manipulation
  const maskRef = useRef(IMask.createMask(maskedOptions));
  // TODO-db-200512 update mask options on options change
  // useEffect(() => {
  //   if (maskRef.current && maskRef.current.el === inputEl) {
  //     maskRef.current.updateOptions(maskedOptions);
  //   }
  // }, []);

  // useful for when the actual typed value did not change, but the
  // masked value did change. forcing an update synchronises the UI
  const forceUpdate = useForceUpdate();

  // prepare input mask
  const inputMaskRef = useRef<IMask.InputMask<typeof maskedOptions> | null>(null);
  useLayoutEffect(() => {
    if (inputEl) {
      inputMaskRef.current = IMask<typeof maskedOptions>(inputEl, maskRef.current).on(
        'complete',
        () => {
          const typedValue = inputMaskRef.current?.typedValue as Value | undefined;
          const nextFieldValue = !typedValue && typedValue !== 0 ? null : typedValue;

          // we access the underlying plumb because it holds
          // the reference to the orignal object, giving us
          // always the most current value. if value didn't
          // change, do a force update to keep the UI in sync
          if (formField.plumb.state.value !== nextFieldValue) {
            formField.setValue(nextFieldValue);
          } else {
            forceUpdate();
          }

          // we want this asynchronously called because some browsers (safari) decide to hide the validity box on input
          const { validity } = inputEl;
          if (!validity.valid) {
            const reportValidity = () => inputEl.reportValidity();
            setTimeout(reportValidity, 0);
          }
        },
      );
      return () => inputMaskRef.current?.destroy();
    }
  }, [inputEl]);

  // TODO-db-200513 sync mask with form value, is it necessary?
  // useEffect(() => {
  //   if (inputMaskRef.current) {
  //     inputMaskRef.current.value === formField.value ?? '';
  //   }
  // }, [formField.value]);

  // add prefix and/or sufix
  let defaultValue = maskRef.current.value;
  if (prefix && defaultValue) {
    defaultValue = prefix + defaultValue;
  }
  if (suffix && defaultValue) {
    defaultValue = defaultValue + suffix;
  }

  return {
    ...formField,
    inputProps: {
      type: 'text',
      name: path,
      defaultValue,
      required,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      ref: setInputEl,
    },
  };
}
