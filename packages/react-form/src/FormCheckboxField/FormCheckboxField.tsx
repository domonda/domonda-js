/**
 *
 * FormCheckboxField/FormCheckboxField
 *
 */

import React from 'react';
import {
  useFormCheckboxField,
  UseFormCheckboxFieldProps,
  FormCheckboxFieldAPI,
} from './useFormCheckboxField';

export interface FormCheckboxFieldProps extends UseFormCheckboxFieldProps {
  children: (api: FormCheckboxFieldAPI) => React.ReactElement | null;
}

export const FormCheckboxField: React.FC<FormCheckboxFieldProps> = (props) => {
  const { children, ...rest } = props;
  const api = useFormCheckboxField(rest);
  return children(api);
};
