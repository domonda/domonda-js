/**
 *
 * FormState/FormSubmittingState
 *
 */

import React from 'react';
import { Form as RxForm } from '@domonda/form';
import { useFormState } from './useFormState';
import { submittingSelector } from './selectors';

export function useFormSubmittingState<DefaultValues extends object>(): [
  boolean,
  RxForm<DefaultValues>,
] {
  const [value, form] = useFormState<DefaultValues, boolean>(submittingSelector);
  return [value, form];
}

export interface FormSubmittingStateProps<DV extends object> {
  children: (value: boolean, form: RxForm<DV>) => React.ReactElement | null;
}

export function FormSubmittingState<DefaultValues extends object>(
  props: FormSubmittingStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children } = props;
  const [value, form] = useFormSubmittingState<DefaultValues>();
  return children(value, form);
}
