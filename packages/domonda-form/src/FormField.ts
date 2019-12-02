/**
 *
 * FormField
 *
 */

import { FormFieldState } from './Form';
import { Plumb, Transformer } from '@domonda/plumb';
import { FormTag } from './FormTag';

export interface FormFieldStateWithValues<T> extends FormFieldState {
  defaultValue: Readonly<T>;
  value: Readonly<T>;
  disabled: boolean;
  readOnly: boolean;
}

export type FormFieldValidityMessage = string | null;

export type FormFieldValidate<T> = (value: Readonly<T>) => FormFieldValidityMessage;

export interface FormFieldConfig<T> {
  validate?: FormFieldValidate<T>;
  immediateValidate?: boolean;
  transformer?: Transformer<T, FormTag>;
}

export interface FormField<T> {
  readonly plumb: Plumb<FormFieldStateWithValues<T>, FormTag>;
  readonly state: FormFieldStateWithValues<T>;
  readonly value: T;
  setValue: (value: T) => void;
  resetValue: () => void;
}

// alias form `field.plumb.dispose()`
export type FormFieldDispose = () => void;
