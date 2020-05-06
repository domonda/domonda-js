/**
 *
 * FormSelectField/FormSelectField
 *
 */

import React from 'react';
import {
  useFormSelectField,
  UseFormSelectFieldProps,
  FormSelectFieldAPI,
} from './useFormSelectField';

export interface FormSelectFieldProps extends UseFormSelectFieldProps {
  children: (api: FormSelectFieldAPI) => React.ReactElement | null;
}

export const FormSelectField: React.FC<FormSelectFieldProps> = (props) => {
  const { children, ...rest } = props;
  const api = useFormSelectField(rest);
  return children(api);
};
