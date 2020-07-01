/**
 *
 * FormState/selectors
 *
 */

import { FormState as DomondaFormState } from '@domonda/form';
import get from 'lodash/get';

export const defaultValuesSelector = <DV extends Record<string, any>>({
  defaultValues,
}: DomondaFormState<DV>) => defaultValues;

export const makeDefaultValueSelector = <V>(path: string) => ({
  defaultValues,
}: DomondaFormState<any>): V => get(defaultValues, path);

export const valuesSelector = <DV extends Record<string, any>>({ values }: DomondaFormState<DV>) =>
  values;

export const makeValueSelector = <V>(path: string) => ({
  values,
}: DomondaFormState<any>): V | null => get(values, path);

export const submittingSelector = ({ submitting }: DomondaFormState<any>) => submitting;

export const submitErrorSelector = ({ submitError }: DomondaFormState<any>) => submitError;

export const disabledSelector = ({ disabled }: DomondaFormState<any>) => disabled;

export const readOnlySelector = ({ readOnly }: DomondaFormState<any>) => readOnly;

export const fieldsSelector = ({ fields }: DomondaFormState<any>) => fields;

export const changedSelector = ({ fields }: DomondaFormState<any>) =>
  Object.keys(fields).some((key) => fields[key].changed);

export const invalidSelector = ({ fields }: DomondaFormState<any>) =>
  Object.keys(fields).some((key) => fields[key].validityMessage !== null);

export const lockedSelector = (state: DomondaFormState<any>) => {
  const disabled = disabledSelector(state);
  if (disabled) {
    return true;
  }
  const readOnly = readOnlySelector(state);
  if (readOnly) {
    return true;
  }
  const submitting = submittingSelector(state);
  if (submitting) {
    return true;
  }
  return !changedSelector(state);
};
