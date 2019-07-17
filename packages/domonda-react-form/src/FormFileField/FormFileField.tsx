/**
 *
 * FormFileField/FormFileField
 *
 */

import React from 'react';
import { useFormFileField, UseFormFileFieldProps, FormFileFieldAPI } from './useFormFileField';

export interface FormFileFieldProps<V extends File | FileList> extends UseFormFileFieldProps<V> {
  children: (api: FormFileFieldAPI<V>) => React.ReactElement | null;
}

export function FormFileField<Value extends File | FileList>(
  props: FormFileFieldProps<Value>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const api = useFormFileField(rest);
  return children(api);
}
