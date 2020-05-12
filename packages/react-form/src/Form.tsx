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
import unset from 'lodash/fp/unset';
import deepmerge from 'deepmerge';

export { FormSubmitHandler } from '@domonda/form';

export type FormProps<V extends FormDefaultValues> = FormConfig<V> &
  Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'defaultValue' | 'defaultChecked'
  > & {
    disabled?: boolean;
    readOnly?: boolean;
    defaultValues?: V;
    /**
     * Resets the from completely when the default values change.
     * Default behaviour merges the incoming default values by
     * reseting the "unchanged" fields and leaving the "changed"
     * ones intact.
     */
    resetOnDefaultValuesChange?: boolean;
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
    transformer,
    // component
    children,
    ...rest
  } = props;

  const [form, dispose] = useMemo(() => {
    const [form, dispose] = createForm(defaultValues, {
      resetOnSuccessfulSubmit,
      resetOnFailedSubmit,
      onSubmit,
      autoSubmit,
      autoSubmitDelay,
      disableOnSubmit,
      transformer,
    });

    // if the state is initally different from the default one, change it during initialization
    if (form.state.disabled !== disabled || form.state.readOnly !== readOnly) {
      form.plumb.next(
        {
          ...form.plumb.state,
          disabled,
          readOnly,
        },
        FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
      );
    }

    return [form, dispose];
  }, []);

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
      transformer,
    };
  }, [
    formEl,
    resetOnSuccessfulSubmit,
    resetOnFailedSubmit,
    onSubmit,
    autoSubmit,
    autoSubmitDelay,
    disableOnSubmit,
    transformer,
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
            ? // hard reset to default values
              defaultValues
            : // update values which haven't changed
              deepmerge(
                form.state.values,
                changedPaths.reduce((acc, changedPath) => unset(changedPath, acc), defaultValues),
                {
                  // arrays dont merge, they overwrite
                  arrayMerge: (_0, source) => source,
                },
              ),
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
