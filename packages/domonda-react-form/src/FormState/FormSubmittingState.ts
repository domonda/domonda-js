/**
 *
 * FormState/FormSubmittingState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState, UseFormStateProps } from './useFormState';
import { submittingSelector } from './selectors';

export function useFormSubmittingState<DefaultValues extends object>(
  props?: UseFormStateProps,
): [boolean, DomondaForm<DefaultValues>] {
  const [value, form] = useFormState<DefaultValues, boolean>(submittingSelector, props);
  return [value, form];
}

export interface FormSubmittingStateProps<DV extends object> extends UseFormStateProps {
  children: (value: boolean, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormSubmittingState<DefaultValues extends object>(
  props: FormSubmittingStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [value, form] = useFormSubmittingState<DefaultValues>(rest);
  return children(value, form);
}
