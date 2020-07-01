/**
 *
 * FormState/FormReadOnlyState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState, UseFormStateProps } from './useFormState';
import { readOnlySelector } from './selectors';

export function useFormReadOnlyState<DefaultValues extends Record<string, any>>(
  props?: UseFormStateProps<any>,
): [boolean, DomondaForm<DefaultValues>] {
  const [value, form] = useFormState<DefaultValues, boolean>(readOnlySelector, props);
  return [value, form];
}

export interface FormReadOnlyStateProps<DV extends Record<string, any>>
  extends UseFormStateProps<any> {
  children: (value: boolean, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormReadOnlyState<DefaultValues extends Record<string, any>>(
  props: FormReadOnlyStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [value, form] = useFormReadOnlyState<DefaultValues>(rest);
  return children(value, form);
}
