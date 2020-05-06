/**
 *
 * FormState/FormState
 *
 */

import React from 'react';
import { Form as DomondaForm } from '@domonda/form';
import { UseFormStateSelector, useFormState, UseFormStateProps } from './useFormState';

export interface FormStateProps<DV extends object, V> extends UseFormStateProps<V> {
  children: (value: V, form: DomondaForm<DV>) => React.ReactElement | null;
  selector: UseFormStateSelector<DV, V>;
}

export function FormState<DefaultValues extends object, V>(
  props: FormStateProps<DefaultValues, V>,
): React.ReactElement | null {
  const { children, selector, ...rest } = props;
  const [value, form] = useFormState<DefaultValues, V>(selector, rest);
  return children(value, form);
}
