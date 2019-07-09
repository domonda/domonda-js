/**
 *
 * FormField/FormField
 *
 */

import React from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI } from './useFormField';

export interface FormFieldProps<V> extends UseFormFieldProps<V> {
  children: (field: FormFieldAPI<V>) => React.ReactElement | null;
}

export function FormField<Value>(props: FormFieldProps<Value>): React.ReactElement | null {
  const { children, ...rest } = props;
  const field = useFormField<Value>(rest);
  return children(field);
}
