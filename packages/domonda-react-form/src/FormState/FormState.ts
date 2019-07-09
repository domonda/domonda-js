/**
 *
 * FormState/FormState
 *
 */

import React from 'react';
import { Form as RxForm } from '@domonda/form';
import { UseFormStateSelector, useFormState } from './useFormState';

export interface FormStateProps<DV extends object, V> {
  children: (value: V, form: RxForm<DV>) => React.ReactElement | null;
  selector: UseFormStateSelector<DV, V>;
}

export function FormState<DefaultValues extends object, V>(
  props: FormStateProps<DefaultValues, V>,
): React.ReactElement | null {
  const { children, selector } = props;
  const [value, form] = useFormState<DefaultValues, V>(selector);
  return children(value, form);
}
