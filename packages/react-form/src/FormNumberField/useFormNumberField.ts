/**
 *
 * FormNumberField/useFormNumberField
 *
 */

import {
  useFormMaskedField,
  UseFormMaskedFieldProps,
  FormMaskedFieldAPI,
} from '../FormMaskedField/useFormMaskedField';
import { Mask } from '../FormMaskedField/mask';

export type UseFormNumberFieldProps = Omit<
  UseFormMaskedFieldProps<Mask.MaskedNumberOptions>,
  'mask' // fixed to `Number`
>;

export type FormNumberFieldAPI = FormMaskedFieldAPI<Mask.MaskedNumberOptions>;

export function useFormNumberField(props: UseFormNumberFieldProps): FormNumberFieldAPI {
  return useFormMaskedField({
    signed: true, // default is `false`
    radix: '.', // fractional delimiter
    mapToRadix: [','], // symbols to process as radix
    ...props,
    mask: Number,
  });
}
