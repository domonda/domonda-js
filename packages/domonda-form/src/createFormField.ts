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
import pick from 'lodash/fp/pick';
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
  setState: (nextState: FormState<T>) => void,
  isLocalNext: boolean,
): FormFieldStateWithValues<V> | undefined {
  const { fields, defaultValues, values } = state;

  const field: FormFieldState | undefined = fields[path];
  if (!field) {
    return undefined;
  }

  const defaultValue = get(defaultValues, path);
  const value = get(values, path);

  if (isLocalNext) {
    return {
      ...field,
      defaultValue,
      value,
    };
  }

  // update the `changed` flag if it is not consistent with the field itself
  // this case will happen when the value gets changed externally (from the form)
  const changed = !equal(defaultValue, value);
  if (field.changed !== changed) {
    setState({
      ...state,
      fields: {
        ...state.fields,
        [path]: {
          ...field,
          changed,
        },
      },
    });
  }

  return {
    ...field,
    defaultValue,
    value,
    changed,
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

  // a flag which prevents double checking the value equality
  // when the field sends the next signal. if the form sends a new
  // value then the check will be performed while deriving the state
  let localNext = false;

  const $ = new AnonymousSubject(
    {
      next: (field) => {
        localNext = true;
        form$.next({
          ...form$.value,
          values: setWith(clone, path, field.value, form$.value.values),
          fields: {
            ...form$.value.fields,
            [path]: pick(['changed', 'validityMessage'], field),
          },
        });
        localNext = false;
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
      map(
        (state) =>
          deriveState<DefaultValues, Value>(
            path,
            state,
            (nextState) => form$.next(nextState),
            localNext,
          )!,
      ),
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

    let currValidationMessage: string | null | undefined = null;
    let counter = 0;
    validator.subscribe((state) =>
      // we perform the validation after all subscribers have been notified about the value change
      setTimeout(() => {
        const { value, ...rest } = state!;

        const pendingValidityMessage = validate(value);

        if (!(pendingValidityMessage instanceof Promise)) {
          if (pendingValidityMessage !== currValidationMessage) {
            currValidationMessage = pendingValidityMessage;
            $.next({ ...rest, value, validityMessage: pendingValidityMessage });
          }
          return;
        }

        // we use the counter as a simple cancel mechanism
        const internalCounter = counter;
        counter++;

        if (currValidationMessage !== undefined) {
          currValidationMessage = undefined;
          $.next({ ...rest, value, validityMessage: currValidationMessage });
        }
        pendingValidityMessage.then((nextValidityMessage) => {
          // if the internalCounter does not match the outer counter that means that another, newer, validity check is pending
          if (internalCounter + 1 === counter) {
            currValidationMessage = nextValidityMessage;
            $.next({ ...rest, value, validityMessage: nextValidityMessage });
          }
        });
      }, 0),
    );
  }

  function getState() {
    const state = deriveState<DefaultValues, Value>(
      path,
      form$.value,
      (nextState) => form$.next(nextState),
      false,
    );
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
        const curr = getState();
        $.next({ ...curr, changed: !equal(curr.defaultValue, nextValue), value: nextValue });
      },
      resetValue: () => {
        const curr = getState();
        $.next({ ...curr, changed: false, value: curr.defaultValue });
      },
    },
    () => $.complete(),
  ];
}
