/**
 *
 * FormDateField/useFormDateField
 *
 */

import React, { useCallback, useMemo, useEffect, useState, useRef } from 'react';
import { parseISOToDate, stripTime } from './date';
import { UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';
import { useFormContext } from '../FormContext';
import { DateInput, DateInputProps } from './DateInput';
import { Plumb, usePlumbState, useDeepMemoOnValue } from '@domonda/react-plumb';

export type FormDateFieldValidate = FormFieldValidate<Date | string | null>;

export interface UseFormDateFieldProps extends UseFormFieldProps<Date | string | null> {
  required?: boolean;
}

export interface FormDateFieldDateInputProps
  extends Omit<DateInputProps, 'required' | 'selected' | 'onChange'> {
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface FormDateFieldAPI extends FormFieldAPI<Date | string | null> {
  DateInput: React.FC<FormDateFieldDateInputProps>;
}

export function useFormDateField(props: UseFormDateFieldProps): FormDateFieldAPI {
  const form = useFormContext();

  const memoProps = useDeepMemoOnValue(props);

  const { required, path, ...config } = memoProps;

  const plumbRef = useRef<Plumb<any, any> | null>(null);
  const [field] = useMemo(() => {
    // dispose on field change
    if (plumbRef.current && !plumbRef.current.disposed) {
      plumbRef.current.dispose();
    }
    return form.makeFormField<Date | string | null>(path, config);
  }, [form, memoProps]);

  if (plumbRef.current !== field.plumb) {
    plumbRef.current = field.plumb;
  }

  useEffect(
    () => () => {
      if (plumbRef.current && !plumbRef.current.disposed) {
        plumbRef.current.dispose();
      }
    },
    [],
  );

  const FormDateInput = useMemo<React.FC<FormDateFieldDateInputProps>>(() => {
    const FormDateInput: React.FC<FormDateFieldDateInputProps> = ({
      children,
      className,
      popperClassName,
      calendarClassName,
      inputRef,
      showTimeSelect,
      showTimeSelectOnly,
      ...rest
    }) => {
      const [{ value, validityMessage, disabled, readOnly }] = usePlumbState({
        plumb: field.plumb,
      });

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
          field.setValue(
            // dont strip time when selecting time in the picker
            date ? (showTimeSelect || showTimeSelectOnly ? date : stripTime(date)) : null,
          );

          if (inputEl) {
            // we want this asynchronously called because some browsers (safari) decide to hide the validity box on input
            const { validity } = inputEl;
            if (!validity.valid) {
              const reportValidity = () => inputEl.reportValidity();
              setTimeout(reportValidity, 0);
            }
          }
        },
        [field, inputEl, showTimeSelect, showTimeSelectOnly],
      );

      const handleRef = useCallback(
        (dateInput: any) => {
          if (dateInput) {
            setInputEl(dateInput.input || null);

            if (typeof inputRef === 'function') {
              inputRef(dateInput.input || null);
            } else if (inputRef && inputRef.current) {
              (inputRef as React.MutableRefObject<HTMLInputElement>).current =
                dateInput.input || null;
            }
          }
        },
        [inputRef],
      );

      return (
        <DateInput
          disabled={disabled}
          readOnly={readOnly}
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={showTimeSelectOnly}
          {...rest}
          ref={handleRef}
          required={required}
          selected={
            value && typeof value === 'string' ? parseISOToDate(value) : (value as Date | null)
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
