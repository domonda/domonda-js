/**
 *
 * FormMaskedField/useFormMaskedField
 *
 */

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';
import { Mask } from './mask';
import { useDeepMemoOnValue } from '@domonda/react-plumb/useMemoOnValue';

export type FormMaskedFieldValue<O extends Mask.AnyMaskedOptions> = Mask.MaskedTypedValue<
  O['mask']
> | null;

export type FormMaskedFieldValidate<O extends Mask.AnyMaskedOptions> = FormFieldValidate<
  FormMaskedFieldValue<O>
>;

export type UseFormMaskedFieldProps<O extends Mask.AnyMaskedOptions> = O &
  UseFormFieldProps<FormMaskedFieldValue<O>> & {
    required?: boolean;
  };

export interface FormMaskedFieldAPI<O extends Mask.AnyMaskedOptions>
  extends FormFieldAPI<FormMaskedFieldValue<O>> {
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

export function useFormMaskedField<Options extends Mask.AnyMaskedOptions>(
  props: UseFormMaskedFieldProps<Options>,
): FormMaskedFieldAPI<Options> {
  const {
    // direct
    required,
    // form
    path,
    validate,
    immediateValidate,
    transformer,
    // mask
    ...maskOptions
  } = props;

  // initialize form field
  const formField = useFormField<FormMaskedFieldValue<Options>>({
    path,
    validate,
    immediateValidate,
    transformer,
  });

  const memoMaskOptions = useDeepMemoOnValue((maskOptions as unknown) as Options);
  const inputMaskRef = useRef<Mask.InputMask<Options> | null>(null);
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  useLayoutEffect(() => {
    if (inputEl) {
      inputMaskRef.current = new Mask.InputMask(inputEl, memoMaskOptions).on('complete', () => {
        const nextFieldValue =
          // when input value is '', the typed value is 0
          (inputMaskRef.current?.value ?? '') !== ''
            ? inputMaskRef.current?.typedValue ?? null
            : null;

        if (formField.plumb.state.value !== nextFieldValue) {
          formField.setValue(nextFieldValue);
        }
      });
      inputMaskRef.current.typedValue = formField.value == null ? ('' as any) : formField.value;
      return () => inputMaskRef.current?.destroy();
    }
  }, [inputEl]);

  // sync options
  useLayoutEffect(() => {
    if (inputMaskRef.current) {
      inputMaskRef.current.updateOptions(memoMaskOptions);
    }
  }, [memoMaskOptions]);

  // sync value
  useLayoutEffect(() => {
    if (
      inputMaskRef.current &&
      (formField.value !== inputMaskRef.current.typedValue ||
        // handle cases like Number('') === 0,
        // for details see https://github.com/uNmAnNeR/imaskjs/issues/134
        (typeof formField.value !== 'string' &&
          inputMaskRef.current.value === '' &&
          !inputMaskRef.current.el.isActive))
    ) {
      inputMaskRef.current.typedValue = formField.value == null ? ('' as any) : formField.value;
    }
  }, [formField.value]);

  // sync validity
  const { validityMessage } = formField.state;
  useEffect(() => {
    if (inputEl) {
      inputEl.setCustomValidity(validityMessage || '');
      if (validityMessage) {
        inputEl.reportValidity();
      }
    }
  }, [validityMessage || '']);

  return {
    ...formField,
    inputProps: {
      type: 'text',
      name: path,
      defaultValue: formField.value == null ? '' : String(formField.value),
      required,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      ref: setInputEl,
    },
  };
}
