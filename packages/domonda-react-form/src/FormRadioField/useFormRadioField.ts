/**
 *
 * FormRadioField/useFormRadioField
 *
 */

import React, {
  useCallback,
  // useState,
  // useEffect
} from 'react';
import { useFormField, UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';

export type FormRadioFieldValidate = FormFieldValidate<string | null>;

export interface UseFormRadioFieldProps extends UseFormFieldProps<string | null> {
  required?: boolean;
}

export interface FormRadioFieldAPI extends FormFieldAPI<string | null> {
  inputProps: {
    type: 'radio';
    name: string;
    required: boolean | undefined;
    disabled: boolean;
    readOnly: boolean;
    // ref: (element: HTMLInputElement | null) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
}

export function useFormRadioField(props: UseFormRadioFieldProps): FormRadioFieldAPI {
  const { required, validate, ...formFieldProps } = props;
  const formField = useFormField<string | null>(formFieldProps);

  if (validate) {
    throw new Error('`validate` prop is not supported on the `FormRadioField` component!');
  }

  /**
   * In which input to display the validity message is undecidable given more radio inputs
   */

  // const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);

  // const { validityMessage } = formField.state;
  // useEffect(() => {
  //   if (inputEl) {
  //     inputEl.setCustomValidity(validityMessage || '');
  //     if (validityMessage) {
  //       inputEl.reportValidity();
  //     }
  //   }
  // }, [validityMessage || '']);

  const handleChange = useCallback<React.FormEventHandler<HTMLInputElement>>(
    ({ currentTarget }) => {
      formField.setValue(currentTarget.value || null);

      // we want this asynchronously called because some browsers (safari) decide to hide the validity box on input
      const { validity } = currentTarget;
      if (!validity.valid) {
        const reportValidity = () => currentTarget.reportValidity();
        setTimeout(reportValidity, 0);
      }
    },
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
      // ref: setInputEl,
      onChange: handleChange,
    },
  };
}
