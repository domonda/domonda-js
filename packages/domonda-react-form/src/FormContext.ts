/**
 *
 * FormContext
 *
 */

import { createContext, useContext } from 'react';
import { Form as RxForm, createForm } from '@domonda/form';

const [defaultForm] = createForm<any>();
export const FormContext = createContext(defaultForm);

export function useFormContext<DefaultValues extends object>(): RxForm<DefaultValues> {
  return useContext<RxForm<DefaultValues>>(FormContext);
}
