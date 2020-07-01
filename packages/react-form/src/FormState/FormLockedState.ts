/**
 *
 * FormState/FormLockedState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState, UseFormStateProps } from './useFormState';
import { lockedSelector } from './selectors';

export function useFormLockedState<DefaultValues extends Record<string, any>>(
  props?: UseFormStateProps<any>,
): [boolean, DomondaForm<DefaultValues>] {
  const [value, form] = useFormState<DefaultValues, boolean>(lockedSelector, props);
  return [value, form];
}

export interface FormLockedStateProps<DV extends Record<string, any>>
  extends UseFormStateProps<any> {
  children: (value: boolean, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormLockedState<DefaultValues extends Record<string, any>>(
  props: FormLockedStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [value, form] = useFormLockedState<DefaultValues>(rest);
  return children(value, form);
}
