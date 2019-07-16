/**
 *
 * Form
 *
 */

import { equal } from './equality';
import get from 'lodash/get';
import setWith from 'lodash/fp/setWith';
import clone from 'lodash/fp/clone';
import omit from 'lodash/fp/omit';
import { AnonymousSubject } from 'rxjs/internal/Subject';

// $
import { map, distinctUntilChanged, skip, debounceTime, takeWhile } from 'rxjs/operators';

// form
import { FormDefaultValues, FormState, FormFieldState, Form$ } from './Form';
import {
  FormField,
  FormFieldStateWithValues,
  FormFieldConfig,
  FormFieldDestroy,
} from './FormField';

function deriveState<T extends FormDefaultValues, V>(
  path: string,
  state: FormState<T>,
): FormFieldStateWithValues<V> | undefined {
  const { fields, defaultValues, values } = state;

  const field: FormFieldState | undefined = fields[path];
  if (!field) {
    return undefined;
  }

  const defaultValue = get(defaultValues, path);
  const value = get(values, path);
  return {
    ...field,
    defaultValue,
    value,
    changed: !equal(defaultValue, value),
  };
}

export function createFormField<DefaultValues extends FormDefaultValues, Value>(
  form$: Form$<DefaultValues>,
  path: string, // [K in keyof FormDefaultValues]
  config: FormFieldConfig<Value> = {},
): [FormField<Value>, FormFieldDestroy] {
  const initialDefaultValue = get(form$.value.values, path);
  const initialValue = get(form$.value.defaultValues, path);

  form$.next({
    ...form$.value,
    fields: {
      ...form$.value.fields,
      [path]: {
        changed: !equal(initialDefaultValue, initialValue),
        validityMessage: null,
      },
    },
  });

  const $ = new AnonymousSubject(
    {
      next: (field) => {
        form$.next({
          ...form$.value,
          values: setWith(clone, path, field.value, form$.value.values),
          fields: {
            ...form$.value.fields,
            [path]: omit(['value', 'defaultValue'], field),
          },
        });
      },
      error: () => {
        form$.next({
          ...form$.value,
          fields: omit(path, form$.value.fields),
        });
      },
      complete: () => {
        form$.next({
          ...form$.value,
          fields: omit(path, form$.value.fields),
        });
      },
    },
    form$.pipe(
      // we assert non-null here because the stream will complete when
      // this map gets an undefined value (field is removed from form)
      // its just a type hack so that we dont assert everywhere else...
      map((state) => deriveState<DefaultValues, Value>(path, state)!),
      // complete stream when the field gets removed
      takeWhile((state) => !!state),
      // publish only changed state
      distinctUntilChanged(equal),
    ),
  );

  const { immediateValidate, validate, validateDebounce = 0 } = config;
  if (validate) {
    const validator =
      validateDebounce > 0
        ? $.pipe(
            // we skip the first iteration since we don't want to invalidate initially
            skip(immediateValidate ? 0 : 1),
            // we don't care about the validity, just the value
            distinctUntilChanged(({ value: prev }, { value: curr }) => equal(prev, curr)),
            debounceTime(validateDebounce),
          )
        : $.pipe(
            // we skip the first iteration since we don't want to invalidate initially
            skip(immediateValidate ? 0 : 1),
            // we don't care about the validity, just the value
            distinctUntilChanged(({ value: prev }, { value: curr }) => equal(prev, curr)),
          );

    let counter = 0;
    validator.subscribe((state) => {
      const { value, validityMessage, ...rest } = state!;

      const pendingValidityMessage = validate(value);

      if (!(pendingValidityMessage instanceof Promise)) {
        if (pendingValidityMessage !== validityMessage) {
          $.next({ ...rest, value, validityMessage: pendingValidityMessage });
        }
        return;
      }

      // we use the counter as a simple cancel mechanism
      const internalCounter = counter;
      counter++;

      if (validityMessage !== undefined) {
        $.next({ ...rest, value, validityMessage: undefined });
      }
      pendingValidityMessage.then((nextValidityMessage) => {
        // if the internalCounter does not match the outer counter that means that another, newer, validity check is pending
        if (internalCounter + 1 === counter) {
          $.next({ ...rest, value, validityMessage: nextValidityMessage });
        }
      });
    });
  }

  function getState() {
    const state = deriveState<DefaultValues, Value>(path, form$.value);
    if (!state) {
      throw new Error('domonda-form: Field state should be available here!');
    }
    return state;
  }

  function getValue() {
    return getState().value;
  }

  return [
    {
      $,
      get state() {
        return getState();
      },
      get value() {
        return getValue();
      },
      setValue: (nextValue) => {
        $.next({ ...getState(), value: nextValue });
      },
      resetValue: () => {
        const curr = getState();
        $.next({ ...curr, value: curr.defaultValue });
      },
    },
    () => $.complete(),
  ];
}
