/**
 *
 * FormState/FormSubmitErrorState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState, UseFormStateProps } from './useFormState';
import { submitErrorSelector } from './selectors';

export function useFormSubmitErrorState<DefaultValues extends Record<string, any>>(
  props?: UseFormStateProps<any>,
): [Error | null, DomondaForm<DefaultValues>] {
  const [value, form] = useFormState<DefaultValues, Error | null>(submitErrorSelector, props);
  return [value, form];
}

export interface FormSubmitErrorStateProps<DV extends Record<string, any>>
  extends UseFormStateProps<any> {
  children: (value: Error | null, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormSubmitErrorState<DefaultValues extends Record<string, any>>(
  props: FormSubmitErrorStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [value, form] = useFormSubmitErrorState<DefaultValues>(rest);
  return children(value, form);
}
