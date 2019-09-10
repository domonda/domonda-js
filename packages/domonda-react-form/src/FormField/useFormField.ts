/**
 *
 * FormField/useFormField
 *
 */

import { useMemo, useRef, useEffect } from 'react';
import { useFormContext } from '../FormContext';
import { FormFieldConfig, FormFieldValidate, FormField } from '@domonda/form';
import { Plumb } from '@domonda/plumb';
import { usePlumbState, useDeepMemoOnValue } from '@domonda/react-plumb';

export { FormFieldValidate };

export interface UseFormFieldProps<V> extends FormFieldConfig<V> {
  path: string;
}

export type FormFieldAPI<V> = FormField<V>;

export function useFormField<Value>(props: UseFormFieldProps<Value>): FormFieldAPI<Value> {
  const form = useFormContext();

  const memoProps = useDeepMemoOnValue(props);

  const { path, ...config } = memoProps;

  const plumbRef = useRef<Plumb<any, any> | null>(null);
  const [field] = useMemo(() => {
    // dispose on field change
    if (plumbRef.current && !plumbRef.current.disposed) {
      plumbRef.current.dispose();
    }
    return form.makeFormField<Value>(path, config);
  }, [form, memoProps]);

  if (plumbRef.current !== field.plumb) {
    plumbRef.current = field.plumb;
  }

  useEffect(
    () => () => {
      if (plumbRef.current && !plumbRef.current.disposed) {
        plumbRef.current.dispose();
      }
    },
    [],
  );

  const [state] = usePlumbState<any, any>({ plumb: field.plumb });

  return {
    ...field,
    state,
    value: state.value,
  };
}
