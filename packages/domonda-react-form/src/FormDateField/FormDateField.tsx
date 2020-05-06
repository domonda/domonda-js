/**
 *
 * FormDateField/FormDateField
 *
 */

import React from 'react';
import { useFormDateField, UseFormDateFieldProps, FormDateFieldAPI } from './useFormDateField';

export { registerLocale } from 'react-datepicker';

export interface FormDateFieldProps extends UseFormDateFieldProps {
  children: (api: FormDateFieldAPI) => React.ReactElement | null;
}

export const FormDateField: React.FC<FormDateFieldProps> = (props) => {
  const { children, ...rest } = props;
  const api = useFormDateField(rest);
  return children(api);
};
