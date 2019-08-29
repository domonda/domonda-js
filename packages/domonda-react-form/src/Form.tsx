/**
 *
 * Form
 *
 */

import React, { PropsWithChildren, useMemo, useEffect, useState } from 'react';
import { FormContext } from './FormContext';
import {
  createForm,
  Form as DomondaForm,
  FormConfig,
  FormDefaultValues,
  FormTag,
} from '@domonda/form';
import { shallowEqual } from '@domonda/plumb';

export type FormProps<V extends FormDefaultValues> = FormConfig<V> &
  Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'defaultValue' | 'defaultChecked'
  > & {
    defaultValues?: V;
    resetOnDefaultValuesChange?: boolean; // should this be `true` by default?
    getForm?: (form: DomondaForm<V>) => void;
    children:
      | ((form: DomondaForm<V>) => React.ReactElement | React.ReactElement | null)
      | React.ReactElement
      | React.ReactElement[]
      | null;
  };

export function Form<DefaultValues extends FormDefaultValues>(
  props: PropsWithChildren<FormProps<DefaultValues>>,
): React.ReactElement | null {
  const {
    // DomondaFormProps
    defaultValues = {} as DefaultValues,
    resetOnDefaultValuesChange,
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

  const [form, dispose] = useMemo(
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

  useEffect(() => () => dispose(), []);

  useEffect(() => {
    if (!shallowEqual(form.state.defaultValues, defaultValues)) {
      form.plumb.next(
        {
          ...form.state,
          defaultValues,
          values: resetOnDefaultValuesChange ? defaultValues : form.state.values,
        },
        FormTag.DEFAULT_VALUES_CHANGE,
      );
    }
  }, [defaultValues, resetOnDefaultValuesChange]);

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
