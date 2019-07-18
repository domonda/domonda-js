/**
 *
 * FormState/selectors
 *
 */

import { FormState as RxFormState } from '@domonda/form';
import get from 'lodash/get';

export const defaultValuesSelector = <DV extends object>({ defaultValues }: RxFormState<DV>) =>
  defaultValues;

export const makeDefaultValueSelector = <V>(path: string) => ({
  defaultValues,
}: RxFormState<any>): V => get(defaultValues, path);

export const valuesSelector = <DV extends object>({ values }: RxFormState<DV>) => values;

export const makeValueSelector = <V>(path: string) => ({ values }: RxFormState<any>): V | null =>
  get(values, path);

export const submittingSelector = ({ submitting }: RxFormState<any>) => submitting;

export const submitErrorSelector = ({ submitError }: RxFormState<any>) => submitError;

export const fieldsSelector = ({ fields }: RxFormState<any>) => fields;

export const changedSelector = ({ fields }: RxFormState<any>) =>
  Object.keys(fields).some((key) => fields[key].changed);

export const invalidSelector = ({ fields }: RxFormState<any>) =>
  Object.keys(fields).some((key) => fields[key].validityMessage !== null);
