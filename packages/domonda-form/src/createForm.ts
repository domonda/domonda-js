/**
 *
 * Form
 *
 */

import { equal } from './equality';
import has from 'lodash/has';

// $
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, takeWhile, skip, debounceTime, filter } from 'rxjs/operators';

// form
import {
  FormConfigRef,
  FormState,
  FormDefaultValues,
  FormConfig,
  Form,
  FormDestroy,
  FormFields,
} from './Form';
import { createFormField } from './createFormField';

const DEFAULT_AUTO_SUBMIT_DELAY = 300;

export function setChangedOnAllFormFields(fields: FormFields, changed: boolean) {
  return Object.keys(fields).reduce<FormFields>((acc, curr) => {
    return {
      ...acc,
      // if the value under a path does not exist, the field definitely changed!
      [curr]: { ...fields[curr], changed },
    };
  }, {});
}

export function createForm<DefaultValues extends FormDefaultValues>(
  defaultValues: DefaultValues = {} as DefaultValues,
  initialConfig: FormConfig<DefaultValues> = {},
): [Form<DefaultValues>, FormDestroy] {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const configRef = new FormConfigRef(initialConfig, handleSubmit);

  const $ = new BehaviorSubject<FormState<DefaultValues>>({
    defaultValues,
    values: defaultValues,
    fields: {},
    submitting: false,
    submitError: null,
  });

  function applyConfig(usingConfig: FormConfig<DefaultValues>) {
    const { autoSubmit, autoSubmitDelay = DEFAULT_AUTO_SUBMIT_DELAY } = usingConfig;
    if (autoSubmit) {
      const submit$ =
        autoSubmitDelay > 0
          ? $.pipe(
              skip(1),
              debounceTime(autoSubmitDelay),
              distinctUntilChanged(({ values: prevValues }, { values: currValues }) =>
                equal(prevValues, currValues),
              ),
              filter(({ defaultValues, values }) => !equal(defaultValues, values)),
            )
          : $.pipe(
              skip(1),
              distinctUntilChanged(({ values: prevValues }, { values: currValues }) =>
                equal(prevValues, currValues),
              ),
              filter(({ defaultValues, values }) => !equal(defaultValues, values)),
            );

      // since functions are hoisted
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      submit$.subscribe(submit);
    }
  }
  applyConfig(configRef.current);

  const form: Form<DefaultValues> = {
    $,
    get state() {
      return $.value;
    },
    get values() {
      return $.value.values;
    },
    configRef,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    submit,
    reset: () =>
      $.next({
        ...$.value,
        values: $.value.defaultValues,
        submitting: false,
        submitError: null,
        fields: setChangedOnAllFormFields($.value.fields, false),
      }),
    resetSubmitError: () => $.next({ ...$.value, submitting: false, submitError: null }),
    makeFormField: (path, config) => createFormField($, path, config),
  };

  async function handleSubmit(event: Event | null) {
    const { resetOnSuccessfulSubmit, resetOnFailedSubmit, onSubmit } = configRef.current;

    if (onSubmit) {
      if (event) {
        event.preventDefault();
      }

      $.next({ ...$.value, submitting: true, submitError: null });

      // TODO-db-190626 validate fields which haven't changed

      // wait for all validations to finish before continuing
      const validityMessages = await $.pipe(
        map(({ fields }) =>
          Object.keys(fields).reduce(
            (acc, key) => {
              const field = fields[key];
              if (!field) {
                return acc;
              }
              return [...acc, field.validityMessage];
            },
            [] as (string | null | undefined)[],
          ),
        ),
        takeWhile(
          // complete the observable when all validations have finished loading
          (validityMessages) =>
            validityMessages.some((validityMessage) => validityMessage === undefined),
          true,
        ),
      )
        // covert to promise which resolves once the stream completes
        .toPromise();

      if (validityMessages.some((validityMessages) => validityMessages != null)) {
        $.next({ ...$.value, submitting: false });
        return;
      }

      // if all validations passed, continue with the submit
      try {
        await onSubmit($.value.values, form);

        $.next({
          ...$.value,
          submitting: false,
          values: resetOnSuccessfulSubmit ? $.value.defaultValues : $.value.values,
          fields: resetOnSuccessfulSubmit
            ? setChangedOnAllFormFields($.value.fields, false)
            : $.value.fields,
        });
      } catch (error) {
        $.next({
          ...$.value,
          submitting: false,
          submitError: error,
          values: resetOnFailedSubmit ? $.value.defaultValues : $.value.values,
          fields: resetOnFailedSubmit
            ? setChangedOnAllFormFields($.value.fields, false)
            : $.value.fields,
        });
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

  return [form, () => $.complete()];
}
