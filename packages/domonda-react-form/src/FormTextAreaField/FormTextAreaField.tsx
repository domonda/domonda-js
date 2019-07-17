/**
 *
 * FormTextAreaField/FormTextAreaField
 *
 */

import React from 'react';
import {
  useFormTextAreaField,
  UseFormTextAreaFieldProps,
  FormTextAreaFieldAPI,
} from './useFormTextAreaField';

export interface FormTextAreaFieldProps extends UseFormTextAreaFieldProps {
  children: (api: FormTextAreaFieldAPI) => React.ReactElement | null;
}

export const FormTextAreaField: React.FC<FormTextAreaFieldProps> = (props) => {
  const { children, ...rest } = props;
  const api = useFormTextAreaField(rest);
  return children(api);
};
