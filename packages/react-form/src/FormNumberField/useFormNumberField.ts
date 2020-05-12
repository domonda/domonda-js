/**
 *
 * FormNumberField/useFormNumberField
 *
 */

import {
  useFormMaskedField,
  FormMaskedFieldAPI,
  UseFormMaskedFieldProps,
} from '../FormMaskedField/useFormMaskedField';
import IMask from 'imask';

export type UseFormNumberFieldProps<V extends string | number> = Omit<
  UseFormMaskedFieldProps<V> & IMask.MaskedNumberOptions,
  'mask' // fixed to `Number`
>;

export type FormNumberFieldAPI<V extends string | number> = FormMaskedFieldAPI<V>;

export function useFormNumberField<Value extends string | number>(
  props: UseFormNumberFieldProps<Value>,
): FormNumberFieldAPI<Value> {
  return useFormMaskedField<Value>({
    radix: '.', // fractional delimiter
    mapToRadix: [','], // symbols to process as radix
    ...props,
    mask: Number,
  });
}
