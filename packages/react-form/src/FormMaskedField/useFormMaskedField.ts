/**
 *
 * FormMaskedField/useFormMaskedField
 *
 */

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';
import { useForceUpdate } from '@domonda/react-plumb/useForceUpdate';
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
  const memoMaskOptions = useDeepMemoOnValue((maskOptions as unknown) as Options); // why TS, why? 😑
  const prevMemoMaskOptions = usePrevious(memoMaskOptions);
  const maskRef = useRef(Mask.createMask(memoMaskOptions));
  if (prevMemoMaskOptions !== memoMaskOptions) {
    maskRef.current.updateOptions(memoMaskOptions as any); // damn TS... 😩
  }
  if (maskRef.current.typedValue !== formField.value) {
    maskRef.current.typedValue = formField.value ?? '';
  }

  // useful for when the actual typed value did not change, but the
  // masked value did change. forcing an update synchronises the UI
  const forceUpdate = useForceUpdate();

  // prepare input mask
  const inputMaskRef = useRef<Mask.InputMask<typeof maskRef.current> | null>(null);
  useLayoutEffect(() => {
    if (inputEl) {
      inputMaskRef.current = new Mask.InputMask(inputEl, maskRef.current).on('complete', () => {
        const typedValue = inputMaskRef.current?.typedValue;
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
      });
      return () => inputMaskRef.current?.destroy();
    }
  }, [inputEl]);

  return {
    ...formField,
    inputProps: {
      type: 'text',
      name: path,
      defaultValue: maskRef.current.value,
      required,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      ref: setInputEl,
    },
  };
}

function usePrevious<V>(value: V) {
  const ref = useRef<V>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
