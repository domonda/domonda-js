/**
 *
 * FormNumberField/FormNumberField
 *
 */

import React from 'react';
import {
  useFormNumberField,
  UseFormNumberFieldProps,
  FormNumberFieldAPI,
} from './useFormNumberField';

export interface FormNumberFieldProps<V extends string | number>
  extends UseFormNumberFieldProps<V> {
  children: (api: FormNumberFieldAPI<V>) => React.ReactElement | null;
}

export function FormNumberField<Value extends string | number>(
  props: FormNumberFieldProps<Value>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const api = useFormNumberField(rest);
  return children(api);
}
