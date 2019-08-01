/**
 *
 * Form
 *
 */

import { createPlumb, equal } from '@domonda/plumb';
import { FormFieldValidityMessage } from './FormField';

// form
import { FormConfigRef, FormState, FormDefaultValues, FormConfig, Form, FormDispose } from './Form';
import { createFormField } from './createFormField';

const DEFAULT_AUTO_SUBMIT_DELAY = 300;

export function createForm<DefaultValues extends FormDefaultValues>(
  defaultValues: DefaultValues = {} as DefaultValues,
  initialConfig: FormConfig<DefaultValues> = {},
): [Form<DefaultValues>, FormDispose] {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const configRef = new FormConfigRef(initialConfig, handleSubmit);

  const plumb = createPlumb<FormState<DefaultValues>>({
    defaultValues,
    values: defaultValues,
    fields: {},
    submitting: false,
    submitError: null,
  });

  function applyConfig(usingConfig: FormConfig<DefaultValues>) {
    const { autoSubmit, autoSubmitDelay = DEFAULT_AUTO_SUBMIT_DELAY } = usingConfig;
    if (autoSubmit) {
      let currState = plumb.state;
      let currTimeout: any;

      plumb.subscribe((nextState) => {
        (() => {
          if (nextState.submitting) {
            return;
          }

          if (
            equal(currState.values, nextState.values) ||
            equal(nextState.defaultValues, nextState.values)
          ) {
            return;
          }

          if (autoSubmitDelay > 0) {
            if (currTimeout) {
              clearTimeout(currTimeout);
            }
            currTimeout = setTimeout(() => {
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              submit();
            }, autoSubmitDelay);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    submit,
    reset: () => {
      plumb.next({
        ...plumb.state,
        values: plumb.state.defaultValues,
        submitting: false,
        submitError: null,
      });
    },
    resetSubmitError: () => {
      plumb.next({
        ...plumb.state,
        submitting: false,
        submitError: null,
      });
    },
    makeFormField: (path, config) => createFormField(plumb, path, config),
  };

  async function handleSubmit(event: Event | null) {
    const { resetOnSuccessfulSubmit, resetOnFailedSubmit, onSubmit } = configRef.current;

    if (onSubmit) {
      if (event) {
        event.preventDefault();
      }

      plumb.next({
        ...plumb.state,
        submitting: true,
        submitError: null,
      });

      const { fields } = plumb.state;
      const validityMessages = Object.keys(fields).reduce(
        (acc, key) => {
          const field = fields[key];
          if (!field) {
            return acc;
          }
          return [...acc, field.validityMessage];
        },
        [] as FormFieldValidityMessage[],
      );

      if (validityMessages.some((validityMessages) => validityMessages != null)) {
        plumb.next({
          ...plumb.state,
          submitting: false,
        });
        return;
      }

      // if all validations passed, continue with the submit
      try {
        await onSubmit(plumb.state.values, form);

        if (!plumb.disposed) {
          plumb.next({
            ...plumb.state,
            submitting: false,
            values: resetOnSuccessfulSubmit ? plumb.state.defaultValues : plumb.state.values,
          });
        }
      } catch (error) {
        if (!plumb.disposed) {
          plumb.next({
            ...plumb.state,
            submitting: false,
            submitError: error,
            values: resetOnFailedSubmit ? plumb.state.defaultValues : plumb.state.values,
          });
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
