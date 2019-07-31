/**
 *
 * Form
 *
 */

import { FormField, FormFieldConfig, FormFieldDestroy } from './FormField';
import { Plumb } from '@domonda/plumb';

export class FormConfigRef<DefaultValues extends FormDefaultValues> {
  private submitHandler: (event: Event) => void;
  private config: FormConfig<DefaultValues>;
  constructor(config: FormConfig<DefaultValues>, submitHandler: (event: Event) => void) {
    this.submitHandler = submitHandler;
    this.config = config;
    if (this.config.el) {
      this.config.el.addEventListener('submit', this.submitHandler);
    }
  }
  get current() {
    return this.config;
  }
  set current(config) {
    if (this.config.el !== config.el) {
      // if the form element was already assigned, remove the event listener before re-assigning another element
      if (this.config.el) {
        this.config.el.removeEventListener('submit', this.submitHandler);
      }

      if (config.el) {
        config.el.addEventListener('submit', this.submitHandler);
      }
    }

    this.config = config;
  }
}

export type FormDefaultValues = object;

export type FormSubmitHandler<T extends FormDefaultValues> = (
  values: T,
  form: Form<T>,
) => any | Promise<any>;

export interface FormConfig<T extends FormDefaultValues> {
  /** If the submit succeeds, reset the values to the `defaultValues`. */
  resetOnSuccessfulSubmit?: boolean;
  /** If the submit fails, reset the values to the `defaultValues`. */
  resetOnFailedSubmit?: boolean;
  /**
   * Handle your submit logic here. `onSubmit` is internally wrapped
   * in a try/catch so feel free to `throw` errors inside the handler.
   * It is also called with `await`, so the `onSubmit` can be async too!
   */
  onSubmit?: FormSubmitHandler<T>;
  /** Automatically submit the form when changes happen. */
  autoSubmit?: boolean;
  /**
   * The debounce time which triggers the submit event after
   * the specified delay. If `autoSubmit` is true but no delay
   * is specified, the delay of `DEFAULT_AUTO_SUBMIT_DELAY` will
   * be used.
   */
  autoSubmitDelay?: number;
  /**
   * Related form element, its onsubmit event will be replaced.
   */
  el?: HTMLFormElement | null;
}

export interface FormFieldState {
  changed: boolean;
  validityMessage: string | null | undefined; // `undefined` means validity is loading
}

export interface FormFields {
  // flat record of paths as keys to fields
  [key: string]: FormFieldState;
}

export interface FormState<T extends FormDefaultValues> {
  defaultValues: Readonly<T>;
  values: Readonly<T>;
  fields: FormFields;
  submitting: boolean;
  submitError: null | Error;
}

export interface Form<T extends FormDefaultValues> {
  readonly plumb: Plumb<FormState<T>>;
  readonly state: FormState<T>;
  readonly values: T;
  configRef: FormConfigRef<T>;
  submit: () => Promise<void>;
  reset: () => void;
  resetSubmitError: () => void;
  makeFormField: <T>(path: string, config?: FormFieldConfig<T>) => [FormField<T>, FormFieldDestroy];
}

export type FormDestroy = () => void;
