/**
 *
 * FormNumberField/useFormNumberField
 *
 */

import { useMemo } from 'react';
import {
  useFormMaskedField,
  FormMaskedFieldAPI,
  UseFormMaskedFieldProps,
} from '../FormMaskedField/useFormMaskedField';
import { CreateNumberMaskProps, createNumberMask, defaultDecimalSymbol } from './createNumberMask';

export type UseFormNumberFieldProps<V extends string | number> = Pick<
  UseFormMaskedFieldProps<V>,
  Exclude<keyof UseFormMaskedFieldProps<V>, 'mask' | 'numberDecimalSymbol'>
> &
  CreateNumberMaskProps;

export type FormNumberFieldAPI<V extends string | number> = FormMaskedFieldAPI<V>;

export function useFormNumberField<Value extends string | number>(
  props: UseFormNumberFieldProps<Value>,
): FormNumberFieldAPI<Value> {
  const {
    prefix,
    suffix,
    includeThousandsSeparator,
    thousandsSeparatorSymbol,
    allowDecimal,
    decimalSymbol,
    decimalLimit,
    requireDecimal,
    allowNegative,
    allowLeadingZeroes,
    integerLimit,
    parseNumber,
    ...formMaskedFieldProps
  } = props;

  const mask = useMemo(
    () =>
      createNumberMask({
        prefix,
        suffix,
        includeThousandsSeparator,
        thousandsSeparatorSymbol,
        allowDecimal,
        decimalSymbol,
        decimalLimit,
        requireDecimal,
        allowNegative,
        allowLeadingZeroes,
        integerLimit,
      }),
    [
      prefix,
      suffix,
      includeThousandsSeparator,
      thousandsSeparatorSymbol,
      allowDecimal,
      decimalSymbol,
      decimalLimit,
      requireDecimal,
      allowNegative,
      allowLeadingZeroes,
      integerLimit,
    ],
  );

  const formMaskedField = useFormMaskedField<Value>({
    numberDecimalSymbol: decimalSymbol || defaultDecimalSymbol,
    mask,
    parseNumber: parseNumber === undefined ? true : parseNumber,
    ...formMaskedFieldProps,
  });

  return formMaskedField;
}
