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
import { shallowEqual } from 'fast-equals';
import omit from 'lodash/fp/omit';
import merge from 'lodash/fp/merge';
export { FormSubmitHandler } from '@domonda/form';

export type FormProps<V extends FormDefaultValues> = FormConfig<V> &
  Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'defaultValue' | 'defaultChecked'
  > & {
    disabled?: boolean;
    readOnly?: boolean;
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
    disabled = false,
    readOnly = false,
    defaultValues = {} as DefaultValues,
    resetOnDefaultValuesChange,
    resetOnSuccessfulSubmit,
    resetOnFailedSubmit,
    onSubmit,
    autoSubmit,
    autoSubmitDelay,
    disableOnSubmit,
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
        disableOnSubmit,
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
      disableOnSubmit,
    };
  }, [
    formEl,
    resetOnSuccessfulSubmit,
    resetOnFailedSubmit,
    onSubmit,
    autoSubmit,
    autoSubmitDelay,
    disableOnSubmit,
  ]);

  useEffect(() => () => dispose(), []);

  // default values change
  useEffect(() => {
    if (!shallowEqual(form.state.defaultValues, defaultValues)) {
      const changedPaths = Object.keys(form.state.fields).filter(
        (path) => form.state.fields[path].changed,
      );

      form.plumb.next(
        {
          ...form.state,
          defaultValues,
          values: resetOnDefaultValuesChange
            ? defaultValues // hard reset to default values
            : merge(form.state.values, omit(changedPaths, defaultValues)), // update values which haven't changed
        },
        FormTag.DEFAULT_VALUES_CHANGE,
      );
    }
  }, [defaultValues, resetOnDefaultValuesChange]);

  // disabled/readOnly change
  useEffect(() => {
    if (form.state.disabled !== disabled || form.state.readOnly !== readOnly) {
      form.plumb.next(
        {
          ...form.state,
          disabled,
          readOnly,
        },
        FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
      );
    }
  }, [disabled, readOnly]);

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
