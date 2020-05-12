/**
 *
 * FormRadioField/useFormRadioField
 *
 * In which input to display the validity message is undecidable given more radio inputs.
 * Therefore we don't have a `ref` pointing to the child radio inputs.
 *
 */

import React, { useCallback } from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';

export type FormRadioFieldValidate = FormFieldValidate<string | null>;

export interface UseFormRadioFieldProps extends Omit<UseFormFieldProps<string | null>, 'validate'> {
  required?: boolean;
}

export interface FormRadioFieldAPI extends FormFieldAPI<string | null> {
  inputProps: {
    type: 'radio';
    name: string;
    required: boolean | undefined;
    disabled: boolean;
    readOnly: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
}

export function useFormRadioField(props: UseFormRadioFieldProps): FormRadioFieldAPI {
  const { required, ...formFieldProps } = props;
  const formField = useFormField<string | null>(formFieldProps);

  const handleChange = useCallback<React.FormEventHandler<HTMLInputElement>>(
    ({ currentTarget }) => formField.setValue(currentTarget.value || null),
    [formField.setValue],
  );

  return {
    ...formField,
    inputProps: {
      type: 'radio',
      name: formFieldProps.path,
      required,
      disabled: formField.state.disabled,
      readOnly: formField.state.readOnly,
      onChange: handleChange,
    },
  };
}
