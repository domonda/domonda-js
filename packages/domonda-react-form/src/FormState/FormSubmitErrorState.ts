/**
 *
 * FormState/FormSubmitErrorState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState } from './useFormState';
import { submitErrorSelector } from './selectors';

export function useFormSubmitErrorState<DefaultValues extends object>(): [
  Error | null,
  DomondaForm<DefaultValues>,
] {
  const [value, form] = useFormState<DefaultValues, Error | null>(submitErrorSelector);
  return [value, form];
}

export interface FormSubmitErrorStateProps<DV extends object> {
  children: (value: Error | null, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormSubmitErrorState<DefaultValues extends object>(
  props: FormSubmitErrorStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children } = props;
  const [value, form] = useFormSubmitErrorState<DefaultValues>();
  return children(value, form);
}
