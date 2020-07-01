/**
 *
 * FormState/FormSubmittingState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState, UseFormStateProps } from './useFormState';
import { submittingSelector } from './selectors';

export function useFormSubmittingState<DefaultValues extends Record<string, any>>(
  props?: UseFormStateProps<any>,
): [boolean, DomondaForm<DefaultValues>] {
  const [value, form] = useFormState<DefaultValues, boolean>(submittingSelector, props);
  return [value, form];
}

export interface FormSubmittingStateProps<DV extends Record<string, any>>
  extends UseFormStateProps<any> {
  children: (value: boolean, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormSubmittingState<DefaultValues extends Record<string, any>>(
  props: FormSubmittingStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [value, form] = useFormSubmittingState<DefaultValues>(rest);
  return children(value, form);
}
