/**
 *
 * FormMaskedField/useFormMaskedField
 *
 */

import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI } from '../FormField';
import {
  CreateTextMaskInputProps,
  createTextMaskInput,
  unmask,
  Mask,
  conformToMask,
} from './textMask';

export type UseFormMaskedFieldProps<V extends string | number> = UseFormFieldProps<V | null> &
  Pick<CreateTextMaskInputProps, Exclude<keyof CreateTextMaskInputProps, 'inputElement'>> & {
    /** Tells the changle handler to store the raw (conformed) value in the form. */
    disableUnmask?: boolean;
    /** Parse the value to a number. */
    parseNumber?: boolean;
    /** What decimal separator to use when parsing the unmasked value to a number. */
    numberDecimalSymbol?: string;
    /** Whether the field is required. */
    required?: boolean;
  };

export interface FormMaskedFieldAPI<V extends string | number> extends FormFieldAPI<V | null> {
  inputProps: {
    type: 'text';
    value: string;
    required: boolean | undefined;
    ref: (input: HTMLInputElement | null) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
}

function valueToString(value: any): string {
  return !value && value !== 0 ? '' : String(value);
}

function getConformedValue(
  mask: Mask,
  value: any,
  guide?: boolean,
  placeholderChar?: string,
  previousConformedValue?: string,
) {
  return !value && value !== 0
    ? ''
    : conformToMask(mask, valueToString(value), {
        guide,
        placeholderChar,
        previousConformedValue,
      });
}

export function useFormMaskedField<Value extends string | number>(
  props: UseFormMaskedFieldProps<Value>,
): FormMaskedFieldAPI<Value> {
  const {
    mask,
    guide,
    placeholderChar,
    keepCharPositions,
    showMask,
    disableUnmask,
    parseNumber,
    numberDecimalSymbol,
    required,
    ...formFieldProps
  } = props;

  const formField = useFormField<Value | null>(formFieldProps);

  const [conformedValue, setConformedValue] = useState<string>(
    getConformedValue(mask, formField.value, guide, placeholderChar),
  );

  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  const updateInputEl = useCallback(
    (el: HTMLInputElement | null) => {
      if (el !== inputEl) {
        setInputEl(el);
      }
    },
    [inputEl],
  );

  const { validityMessage } = formField.state;
  useEffect(() => {
    if (inputEl) {
      inputEl.setCustomValidity(validityMessage || '');
      if (validityMessage) {
        inputEl.reportValidity();
      }
    }
  }, [validityMessage || '']);

  const textMaskInput = useMemo<{ update: (value: string) => void } | null>(() => {
    if (inputEl) {
      const instance = createTextMaskInput({
        inputElement: inputEl,
        mask,
        guide,
        placeholderChar,
        keepCharPositions,
        showMask,
      });

      instance.update(inputEl.value);

      return instance;
    }

    return null;
  }, [inputEl, mask, guide, placeholderChar, keepCharPositions, showMask]);

  // check if the value changed by an outside effect, if so update the text mask input
  useEffect(() => {
    if (textMaskInput) {
      let currConformedValues = conformedValue;

      // remove the last character if it is the `numberDecimalSymbol`
      const lastIndex = currConformedValues.length - 1;
      if (currConformedValues[lastIndex] === numberDecimalSymbol) {
        currConformedValues = currConformedValues.substring(0, lastIndex);
      }

      const nextConformedValue = getConformedValue(
        mask,
        formField.value,
        guide,
        placeholderChar,
        conformedValue,
      );

      if (currConformedValues !== nextConformedValue) {
        textMaskInput.update(valueToString(formField.value));
        setConformedValue(nextConformedValue);
      }
    }
  }, [textMaskInput, formField.value, conformedValue]);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ currentTarget }) => {
      if (textMaskInput) {
        textMaskInput.update(currentTarget.value);
      }

      setConformedValue(currentTarget.value);
      if (disableUnmask) {
        formField.setValue(
          currentTarget.value
            ? parseNumber
              ? (parseFloat(currentTarget.value) as Value)
              : (currentTarget.value as Value)
            : null,
        );
      } else {
        const unmaskedValue = unmask(mask, currentTarget.value, numberDecimalSymbol);
        formField.setValue(
          unmaskedValue
            ? parseNumber
              ? (parseFloat(unmaskedValue) as Value)
              : (unmaskedValue as Value)
            : null,
        );
      }

      // we want this asynchronously called because some browsers (safari) decide to hide the validity box on input
      const { validity } = currentTarget;
      if (!validity.valid) {
        const reportValidity = () => currentTarget.reportValidity();
        setTimeout(reportValidity, 0);
      }
    },
    [formField.setValue, textMaskInput, disableUnmask, parseNumber, numberDecimalSymbol],
  );

  return {
    ...formField,
    inputProps: {
      type: 'text',
      value: conformedValue,
      required,
      ref: updateInputEl,
      onChange: handleChange,
    },
  };
}
