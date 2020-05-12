/**
 *
 * FormMaskedField/FormMaskedField
 *
 */

import React from 'react';
import {
  useFormMaskedField,
  UseFormMaskedFieldProps,
  FormMaskedFieldAPI,
} from './useFormMaskedField';

export interface FormMaskedFieldProps<V extends string | number>
  extends UseFormMaskedFieldProps<V> {
  children: (api: FormMaskedFieldAPI<V>) => React.ReactElement | null;
}

export function FormMaskedField<Value extends string | number>(
  props: FormMaskedFieldProps<Value>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const api = useFormMaskedField<Value>(rest);
  return children(api);
}
