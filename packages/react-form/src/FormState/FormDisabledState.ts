/**
 *
 * FormState/FormDisabledState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { useFormState, UseFormStateProps } from './useFormState';
import { disabledSelector } from './selectors';

export function useFormDisabledState<DefaultValues extends object>(
  props?: UseFormStateProps<any>,
): [boolean, DomondaForm<DefaultValues>] {
  const [value, form] = useFormState<DefaultValues, boolean>(disabledSelector, props);
  return [value, form];
}

export interface FormDisabledStateProps<DV extends object> extends UseFormStateProps<any> {
  children: (value: boolean, form: DomondaForm<DV>) => React.ReactElement | null;
}

export function FormDisabledState<DefaultValues extends object>(
  props: FormDisabledStateProps<DefaultValues>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [value, form] = useFormDisabledState<DefaultValues>(rest);
  return children(value, form);
}
