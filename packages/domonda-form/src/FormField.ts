/**
 *
 * FormField
 *
 */

import { FormFieldState } from './Form';
import { AnonymousSubject } from 'rxjs/internal/Subject';

export interface FormFieldStateWithValues<T> extends FormFieldState {
  defaultValue: Readonly<T>;
  value: Readonly<T>;
}

export type FormFieldValidate<T> = (value: Readonly<T>) => Promise<string | null> | (string | null);

export interface FormFieldConfig<T> {
  validate?: FormFieldValidate<T>;
  validateDebounce?: number;
  immediateValidate?: boolean;
}

export type FormField$<T> = AnonymousSubject<FormFieldStateWithValues<T>>;

export interface FormField<T> {
  readonly $: FormField$<T>;
  readonly state: FormFieldStateWithValues<T>;
  readonly value: T;
  setValue: (value: T) => void;
  resetValue: () => void;
}

// Alias for: FormField$.complete()
export type FormFieldDestroy = () => void;
