/**
 *
 * FormField/useFormField
 *
 */

import { useMemo, useEffect } from 'react';
import { useFormContext } from '../FormContext';
import { FormFieldConfig, FormFieldValidate, FormField } from '@domonda/form';
import { useValue, useDeepMemoOnValue } from '../hooks';
import { distinctUntilChanged } from 'rxjs/operators';

export { FormFieldValidate };

export interface UseFormFieldProps<V> extends FormFieldConfig<V> {
  path: string;
}

export type FormFieldAPI<V> = FormField<V>;

export function useFormField<Value>(props: UseFormFieldProps<Value>): FormFieldAPI<Value> {
  const form = useFormContext();

  const memoProps = useDeepMemoOnValue(props);

  const { path, ...config } = memoProps;
  const [field, destroy] = useMemo(() => form.makeFormField<Value>(path, config), [
    form,
    memoProps,
  ]);

  // destroy on field change
  useEffect(() => () => destroy(), [field]);

  // destroy the field on unmount
  useEffect(() => () => destroy(), []);

  const state = useValue(() => field.$.pipe(distinctUntilChanged()), () => field.state, [field]);

  return {
    ...field,
    state,
    value: state.value,
  };
}
