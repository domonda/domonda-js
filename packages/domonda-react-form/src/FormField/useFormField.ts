/**
 *
 * FormField/useFormField
 *
 */

import { useMemo, useRef } from 'react';
import { useFormContext } from '../FormContext';
import { FormFieldConfig, FormFieldValidate, FormField } from '@domonda/form';
import { usePlumb, useDeepMemoOnValue } from '../hooks';
import { Disposable } from '@domonda/plumb';

export { FormFieldValidate };

export interface UseFormFieldProps<V> extends FormFieldConfig<V> {
  path: string;
}

export type FormFieldAPI<V> = FormField<V>;

export function useFormField<Value>(props: UseFormFieldProps<Value>): FormFieldAPI<Value> {
  const form = useFormContext();

  const memoProps = useDeepMemoOnValue(props);

  const { path, ...config } = memoProps;

  const disposeRef = useRef<Disposable['dispose'] | null>(null);
  const [field, dispose] = useMemo(() => {
    // dispose on field change
    if (disposeRef.current) {
      disposeRef.current();
    }
    return form.makeFormField<Value>(path, config);
  }, [form, memoProps]);

  if (disposeRef.current !== dispose) {
    disposeRef.current = dispose;
  }

  const state = usePlumb(field.plumb);

  return {
    ...field,
    state,
    value: state.value,
  };
}
