/**
 *
 * FormArrayField/FormArrayField
 *
 */

import React from 'react';
import { useFormArrayField, UseFormArrayFieldProps, FormArrayFieldAPI } from './useFormArrayField';

export type FormArrayFieldProps<
  V,
  AllowEmptyArray extends boolean = false
> = UseFormArrayFieldProps<V, AllowEmptyArray> & {
  children: (field: FormArrayFieldAPI<V, AllowEmptyArray>) => React.ReactElement | null;
};

export function FormArrayField<V, AllowEmptyArray extends boolean = false>(
  props: FormArrayFieldProps<V, AllowEmptyArray>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const api = useFormArrayField((rest as any) as UseFormArrayFieldProps<V, AllowEmptyArray>);
  return children(api);
}
