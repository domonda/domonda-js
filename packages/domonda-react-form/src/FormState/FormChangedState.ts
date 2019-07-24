/**
 *
 * FormState/FormChangedState
 *
 */

import React from 'react';
import { Form as RxForm } from '@domonda/form';
import { useFormState } from './useFormState';
import { changedSelector } from './selectors';

export function useFormChangedState<DefaultValues extends object>(): [
  boolean,
  RxForm<DefaultValues>,
] {
  const [value, form] = useFormState<DefaultValues, boolean>(changedSelector);
  return [value, form];
}

export interface FormChangedStateProps<DV extends object> {
  children: (value: boolean, form: RxForm<DV>) => React.ReactElement | null;
}

export function FormChangedState<DefaultValues extends object>(
  props: FormChangedStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children } = props;
  const [value, form] = useFormChangedState<DefaultValues>();
  return children(value, form);
}
