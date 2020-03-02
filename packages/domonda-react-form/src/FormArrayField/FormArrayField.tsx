/**
 *
 * FormArrayField/FormArrayField
 *
 */

import React from 'react';
import { useFormArrayField, UseFormArrayFieldProps, FormArrayFieldAPI } from './useFormArrayField';

export interface FormArrayFieldProps extends UseFormArrayFieldProps {
  children: (field: FormArrayFieldAPI) => React.ReactElement | null;
}

export const FormArrayField: React.FC<FormArrayFieldProps> = (props) => {
  const { children, ...rest } = props;
  const api = useFormArrayField(rest);
  return children(api);
};
