/**
 *
 * FormField
 *
 */

import { FormFieldState } from './Form';
import { Plumb } from '@domonda/plumb';

export interface FormFieldStateWithValues<T> extends FormFieldState {
  defaultValue: Readonly<T>;
  value: Readonly<T>;
}

export type FormFieldValidityMessage = string | null | undefined; // `undefined` means validity is loading

export type FormFieldValidate<T> = (value: Readonly<T>) => Promise<string | null> | (string | null);

export interface FormFieldConfig<T> {
  validate?: FormFieldValidate<T>;
  validateDebounce?: number;
  immediateValidate?: boolean;
}

export interface FormField<T> {
  readonly plumb: Plumb<FormFieldStateWithValues<T>>;
  readonly state: FormFieldStateWithValues<T>;
  readonly value: T;
  setValue: (value: T) => void;
  resetValue: () => void;
}

// alias form `field.plumb.dispose()`
export type FormFieldDispose = () => void;
