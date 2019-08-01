/**
 *
 * FormState/selectors
 *
 */

import { FormState as DomondaFormState } from '@domonda/form';
import get from 'lodash/get';

export const defaultValuesSelector = <DV extends object>({ defaultValues }: DomondaFormState<DV>) =>
  defaultValues;

export const makeDefaultValueSelector = <V>(path: string) => ({
  defaultValues,
}: DomondaFormState<any>): V => get(defaultValues, path);

export const valuesSelector = <DV extends object>({ values }: DomondaFormState<DV>) => values;

export const makeValueSelector = <V>(path: string) => ({ values }: DomondaFormState<any>): V | null =>
  get(values, path);

export const submittingSelector = ({ submitting }: DomondaFormState<any>) => submitting;

export const submitErrorSelector = ({ submitError }: DomondaFormState<any>) => submitError;

export const fieldsSelector = ({ fields }: DomondaFormState<any>) => fields;

export const changedSelector = ({ fields }: DomondaFormState<any>) =>
  Object.keys(fields).some((key) => fields[key].changed);

export const invalidSelector = ({ fields }: DomondaFormState<any>) =>
  Object.keys(fields).some((key) => fields[key].validityMessage !== null);

export const lockedSelector = (state: DomondaFormState<any>) => {
  const submitting = submittingSelector(state);
  const changed = changedSelector(state);
  return submitting || !changed;
};
