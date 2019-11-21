/**
 *
 * Form
 *
 */

import { createPlumb } from '@domonda/plumb';
import { FormFieldValidityMessage } from './FormField';
import { deepEqual } from 'fast-equals';

// form
import { FormConfigRef, FormState, FormDefaultValues, FormConfig, Form, FormDispose } from './Form';
import { createFormField } from './createFormField';
import { FormTag } from './FormTag';

const DEFAULT_AUTO_SUBMIT_DELAY = 300;

export function createForm<DefaultValues extends FormDefaultValues>(
  defaultValues: DefaultValues = {} as DefaultValues,
  initialConfig: FormConfig<DefaultValues> = {},
): [Form<DefaultValues>, FormDispose] {
  const configRef = new FormConfigRef(initialConfig, handleSubmit);

  const plumb = createPlumb<FormState<DefaultValues>, FormTag>({
    defaultValues,
    values: defaultValues,
    fields: {},
    submitting: false,
    submitError: null,
    disabled: false,
    readOnly: false,
  });

  function applyConfig(usingConfig: FormConfig<DefaultValues>) {
    const { autoSubmit, autoSubmitDelay = DEFAULT_AUTO_SUBMIT_DELAY } = usingConfig;
    if (autoSubmit) {
      let currState = plumb.state;
      let currTimeout: any;

      plumb.subscribe((nextState, tag) => {
        (() => {
          if (tag !== FormTag.FIELD_VALUE_CHANGE && tag !== FormTag.VALUES_CHANGE) {
            return;
          }

          if (
            deepEqual(currState.values, nextState.values) ||
            deepEqual(nextState.defaultValues, nextState.values)
          ) {
            return;
          }

          if (autoSubmitDelay > 0) {
            if (currTimeout) {
              clearTimeout(currTimeout);
            }
            currTimeout = setTimeout(() => {
              submit();
            }, autoSubmitDelay);
          } else {
            submit();
          }
        })();

        currState = nextState;
      });
    }
  }
  applyConfig(configRef.current);

  const form: Form<DefaultValues> = {
    plumb,
    get state() {
      return plumb.state;
    },
    get values() {
      return plumb.state.values;
    },
    configRef,
    submit,
    reset: () => {
      plumb.next(
        {
          ...plumb.state,
          values: plumb.state.defaultValues,
          submitting: false,
          submitError: null,
        },
        FormTag.VALUES_RESET,
      );
    },
    resetSubmitError: () => {
      plumb.next(
        {
          ...plumb.state,
          submitting: false,
          submitError: null,
        },
        FormTag.SUBMIT_ERROR_RESET,
      );
    },
    makeFormField: (path, config) => createFormField(plumb, path, config),
  };

  async function handleSubmit(event: Event | null) {
    const {
      resetOnSuccessfulSubmit,
      resetOnFailedSubmit,
      onSubmit,
      disableOnSubmit,
    } = configRef.current;

    if (onSubmit) {
      if (event) {
        event.preventDefault();
      }

      plumb.next(
        {
          ...plumb.state,
          submitting: true,
          submitError: null,
          disabled: disableOnSubmit ? true : plumb.state.disabled,
        },
        FormTag.SUBMIT,
      );

      const { fields } = plumb.state;
      const validityMessages = Object.keys(fields).reduce((acc, key) => {
        const field = fields[key];
        if (!field) {
          return acc;
        }
        return [...acc, field.validityMessage];
      }, [] as FormFieldValidityMessage[]);

      if (validityMessages.some((validityMessages) => validityMessages != null)) {
        plumb.next(
          {
            ...plumb.state,
            submitting: false,
            disabled: false,
          },
          FormTag.SUBMIT,
        );
        return;
      }

      // if all validations passed, continue with the submit
      try {
        await onSubmit(plumb.state.values, form);

        if (!plumb.disposed) {
          plumb.next(
            {
              ...plumb.state,
              submitting: false,
              disabled: disableOnSubmit ? false : plumb.state.disabled,
              values: resetOnSuccessfulSubmit ? plumb.state.defaultValues : plumb.state.values,
            },
            resetOnSuccessfulSubmit ? FormTag.SUBMIT_WITH_DEFAULT_VALUES_CHANGE : FormTag.SUBMIT,
          );
        }
      } catch (error) {
        if (!plumb.disposed) {
          plumb.next(
            {
              ...plumb.state,
              submitting: false,
              submitError: error,
              disabled: disableOnSubmit ? false : plumb.state.disabled,
              values: resetOnFailedSubmit ? plumb.state.defaultValues : plumb.state.values,
            },
            resetOnFailedSubmit ? FormTag.SUBMIT_WITH_DEFAULT_VALUES_CHANGE : FormTag.SUBMIT,
          );
        }
      }
    }
  }
  async function submit() {
    if (!configRef.current.el) {
      await handleSubmit(null);
    } else if (configRef.current.el.reportValidity()) {
      configRef.current.el.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }

  return [form, () => plumb.dispose()];
}
