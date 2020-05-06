/**
 *
 * FormRadioField/FormRadioField
 *
 */

import React from 'react';
import { useFormRadioField, UseFormRadioFieldProps, FormRadioFieldAPI } from './useFormRadioField';

export interface FormRadioFieldProps extends UseFormRadioFieldProps {
  children: (api: FormRadioFieldAPI) => React.ReactElement | null;
}

export const FormRadioField: React.FC<FormRadioFieldProps> = (props) => {
  const { children, ...rest } = props;
  const api = useFormRadioField(rest);
  return children(api);
};
