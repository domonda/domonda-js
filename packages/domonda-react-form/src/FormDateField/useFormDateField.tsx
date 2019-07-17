/**
 *
 * FormDateField/useFormDateField
 *
 */

import React, { useCallback, useMemo, useEffect, useState } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { parseISOToDate, stripTime } from './date';
import clsx from 'clsx';
import { UseFormFieldProps, FormFieldAPI, FormFieldValidate } from '../FormField';
import { useFormContext } from '../FormContext';
import { createFormField } from '@domonda/form/createFormField';
import { useValue, useDeepMemoOnValue } from '../hooks';

// decorate
import 'react-datepicker/dist/react-datepicker.min.css';
import { decorate, Decorate } from './decorate';
import { distinctUntilChanged } from 'rxjs/operators';

export type FormDateFieldValidate = FormFieldValidate<Date | string | null>;

export type DateInputProps = Pick<
  ReactDatePickerProps,
  Exclude<keyof ReactDatePickerProps, 'required' | 'selected' | 'onChange'>
> & { classes?: Decorate['classes']; inputRef?: React.Ref<HTMLInputElement> };

export interface UseFormDateFieldProps extends UseFormFieldProps<Date | string | null> {
  required?: boolean;
}

export interface FormDateFieldAPI extends FormFieldAPI<Date | string | null> {
  DateInput: React.FC<DateInputProps>;
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

  const DateInput = useMemo<React.FC<DateInputProps>>(() => {
    const DateInput: React.FC<DateInputProps & Decorate> = ({
      children,
      classes,
      className,
      popperClassName,
      calendarClassName,
      inputRef,
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

      const handleChange = useCallback<ReactDatePickerProps['onChange']>(
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

      const handleRef = useCallback(
        (datePicker: any) => {
          if (datePicker) {
            setInputEl(datePicker.input || null);

            if (inputRef) {
              if (typeof inputRef === 'function') {
                inputRef(datePicker.input || null);
              } else {
                (inputRef as any).current = datePicker.input || null;
              }
            }
          }
        },
        [inputRef],
      );

      return (
        <div className={clsx(classes.root, className)}>
          <ReactDatePicker
            dateFormat="dd.MM.yyyy"
            popperPlacement="bottom"
            popperModifiers={{
              preventOverflow: {
                enabled: true,
              },
            }}
            {...rest}
            popperClassName={clsx(classes.popper, popperClassName)}
            calendarClassName={clsx(classes.calendar, calendarClassName)}
            required={required}
            selected={
              value && typeof value === 'string' ? parseISOToDate(value) : (value as (Date | null))
            }
            onChange={handleChange}
            ref={handleRef}
          />
        </div>
      );
    };

    // why `any` you ask again? haha
    const StyledDateInput: any = decorate(DateInput);
    return StyledDateInput;
  }, [field, required]);

  return {
    ...field,
    DateInput,
  };
}
