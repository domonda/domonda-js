/**
 *
 * FormNumberField/FormNumberField
 *
 */

import React from 'react';
import {
  useFormNumberField,
  UseFormNumberFieldProps,
  FormNumberFieldAPI,
} from './useFormNumberField';

export interface FormNumberFieldProps extends UseFormNumberFieldProps {
  children: (api: FormNumberFieldAPI) => React.ReactElement | null;
}

export function FormNumberField(props: FormNumberFieldProps): React.ReactElement | null {
  const { children, ...rest } = props;
  const api = useFormNumberField(rest);
  return children(api);
}
