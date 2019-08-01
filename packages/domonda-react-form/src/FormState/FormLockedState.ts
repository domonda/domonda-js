/**
 *
 * FormState/FormLockedState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState } from './useFormState';
import { lockedSelector } from './selectors';

export function useFormLockedState<DefaultValues extends object>(): [
  boolean,
  DomondaForm<DefaultValues>,
] {
  const [value, form] = useFormState<DefaultValues, boolean>(lockedSelector);
  return [value, form];
}

export interface FormLockedStateProps<DV extends object> {
  children: (value: boolean, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormLockedState<DefaultValues extends object>(
  props: FormLockedStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children } = props;
  const [value, form] = useFormLockedState<DefaultValues>();
  return children(value, form);
}
