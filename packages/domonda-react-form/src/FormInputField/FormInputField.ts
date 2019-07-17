/**
 *
 * FormInputField/FormInputField
 *
 */

import React from 'react';
import { useFormInputField, UseFormInputFieldProps, FormInputFieldAPI } from './useFormInputField';

export interface FormInputFieldProps extends UseFormInputFieldProps {
  children: (api: FormInputFieldAPI) => React.ReactElement | null;
}

export const FormInputField: React.FC<FormInputFieldProps> = (props) => {
  const { children, ...rest } = props;
  const api = useFormInputField(rest);
  return children(api);
};
