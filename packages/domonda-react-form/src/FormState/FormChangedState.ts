/**
 *
 * FormState/FormChangedState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState, UseFormStateProps } from './useFormState';
import { changedSelector } from './selectors';

export function useFormChangedState<DefaultValues extends object>(
  props?: UseFormStateProps,
): [boolean, DomondaForm<DefaultValues>] {
  const [value, form] = useFormState<DefaultValues, boolean>(changedSelector, props);
  return [value, form];
}

export interface FormChangedStateProps<DV extends object> extends UseFormStateProps {
  children: (value: boolean, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormChangedState<DefaultValues extends object>(
  props: FormChangedStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [value, form] = useFormChangedState<DefaultValues>(rest);
  return children(value, form);
}
