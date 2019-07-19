/**
 *
 * FormDateField/useFormDateField
 *
 */

import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { parseISOToDate, stripTime } from './date';
import { UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';
import { useFormContext } from '../FormContext';
import { createFormField } from '@domonda/form/createFormField';
import { useValue, useDeepMemoOnValue } from '../hooks';
import { DateInput, DateInputProps } from './DateInput';
import { distinctUntilChanged } from 'rxjs/operators';

export type FormDateFieldValidate = FormFieldValidate<Date | string | null>;

export interface UseFormDateFieldProps extends UseFormFieldProps<Date | string | null> {
  required?: boolean;
}

export type FormDateFieldDateInputProps = Omit<
  DateInputProps,
  'required' | 'selected' | 'onChange'
>;

export interface FormDateFieldAPI extends FormFieldAPI<Date | string | null> {
  DateInput: React.FC<FormDateFieldDateInputProps>;
}

export function useFormDateField(props: UseFormDateFieldProps): FormDateFieldAPI {
  const form = useFormContext();

  const memoProps = useDeepMemoOnValue(props);

  const { required, path, ...config } = memoProps;
  const [field, destroyField] = useMemo(
    () => createFormField<object, Date | string | null>(form.$, path, config),
    [form, memoProps],
  );

  // destroy the field on unmount
  useEffect(() => () => destroyField(), []);

  const FormDateInput = useMemo<React.FC<FormDateFieldDateInputProps>>(() => {
    const FormDateInput: React.FC<FormDateFieldDateInputProps> = ({
      children,
      className,
      popperClassName,
      calendarClassName,
      ...rest
    }) => {
      const { value, validityMessage } = useValue(
        () => field.$.pipe(distinctUntilChanged()),
        () => field.state,
        [field],
      );

      const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);

      useEffect(() => {
        if (inputEl) {
          inputEl.setCustomValidity(validityMessage || '');
          if (validityMessage) {
            inputEl.reportValidity();
          }
        }
      }, [validityMessage || '']);

      const handleChange = useCallback<DateInputProps['onChange']>(
        (date) => {
          field.setValue(date ? stripTime(date) : null);

          if (inputEl) {
            // we want this asynchronously called because some browsers (safari) decide to hide the validity box on input
            const { validity } = inputEl;
            if (!validity.valid) {
              const reportValidity = () => inputEl.reportValidity();
              setTimeout(reportValidity, 0);
            }
          }
        },
        [field.setValue],
      );

      const handleRef = useCallback((dateInput: any) => {
        if (dateInput) {
          setInputEl(dateInput.input || null);
        }
      }, []);

      return (
        <DateInput
          {...rest}
          ref={handleRef}
          required={required}
          selected={
            value && typeof value === 'string' ? parseISOToDate(value) : (value as (Date | null))
          }
          onChange={handleChange}
        />
      );
    };

    return FormDateInput;
  }, [field, required]);

  return {
    ...field,
    DateInput: FormDateInput,
  };
}
