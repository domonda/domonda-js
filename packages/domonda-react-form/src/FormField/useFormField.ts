/**
 *
 * FormField/useFormField
 *
 */

import { useMemo, useEffect } from 'react';
import { useFormContext } from '../FormContext';
import { FormFieldConfig, FormFieldValidate, FormField } from '@domonda/form';
import { usePlumb, useDeepMemoOnValue } from '../hooks';

export { FormFieldValidate };

export interface UseFormFieldProps<V> extends FormFieldConfig<V> {
  path: string;
}

export type FormFieldAPI<V> = FormField<V>;

export function useFormField<Value>(props: UseFormFieldProps<Value>): FormFieldAPI<Value> {
  const form = useFormContext();

  const memoProps = useDeepMemoOnValue(props);

  const { path, ...config } = memoProps;
  const [field, dispose] = useMemo(() => form.makeFormField<Value>(path, config), [
    form,
    memoProps,
  ]);

  // dispose on field change
  useEffect(() => () => dispose(), [field]);

  const state = usePlumb(field.plumb);

  return {
    ...field,
    state,
    value: state.value,
  };
}
