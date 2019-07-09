/**
 *
 * Form
 *
 */

import React, { PropsWithChildren, useMemo, useEffect, useState } from 'react';
import { FormContext } from './FormContext';
import { createForm, Form as RxForm, FormConfig, FormDefaultValues } from '@domonda/form';
export { FormSubmitHandler } from '@domonda/form';

export type FormProps<V extends FormDefaultValues> = FormConfig<V> &
  Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'defaultValue' | 'defaultChecked'
  > & {
    defaultValues?: V;
    getForm?: (form: RxForm<V>) => void;
    children:
      | ((form: RxForm<V>) => React.ReactElement | React.ReactElement | null)
      | React.ReactElement
      | React.ReactElement[]
      | null;
  };

export function Form<DefaultValues extends FormDefaultValues>(
  props: PropsWithChildren<FormProps<DefaultValues>>,
): React.ReactElement | null {
  const {
    // RxFormProps
    defaultValues = {} as DefaultValues,
    resetOnSuccessfulSubmit,
    resetOnFailedSubmit,
    onSubmit,
    autoSubmit,
    autoSubmitDelay,
    getForm,
    // component
    children,
    ...rest
  } = props;

  const [form, destroy] = useMemo(
    () =>
      createForm(defaultValues, {
        resetOnSuccessfulSubmit,
        resetOnFailedSubmit,
        onSubmit,
        autoSubmit,
        autoSubmitDelay,
      }),
    [],
  );

  const [formEl, setFormEl] = useState<HTMLFormElement | null>(null);

  useEffect(() => {
    form.configRef.current = {
      el: formEl,
      resetOnSuccessfulSubmit,
      resetOnFailedSubmit,
      onSubmit,
      autoSubmit,
      autoSubmitDelay,
    };
  }, [formEl, resetOnSuccessfulSubmit, resetOnFailedSubmit, onSubmit, autoSubmit, autoSubmitDelay]);

  useEffect(() => () => destroy(), []);

  useEffect(() => form.$.next({ ...form.$.value, defaultValues }), [defaultValues]);

  useEffect(() => {
    if (getForm) {
      getForm(form);
    }
  }, [form, getForm]);

  return (
    <FormContext.Provider value={form}>
      <form autoComplete="off" {...rest} ref={setFormEl}>
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormContext.Provider>
  );
}
