/**
 *
 * FormState/FormLockedState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState, UseFormStateProps } from './useFormState';
import { lockedSelector } from './selectors';

export function useFormLockedState<DefaultValues extends object>(
  props?: UseFormStateProps,
): [boolean, DomondaForm<DefaultValues>] {
  const [value, form] = useFormState<DefaultValues, boolean>(lockedSelector, props);
  return [value, form];
}

export interface FormLockedStateProps<DV extends object> extends UseFormStateProps {
  children: (value: boolean, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormLockedState<DefaultValues extends object>(
  props: FormLockedStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [value, form] = useFormLockedState<DefaultValues>(rest);
  return children(value, form);
}
