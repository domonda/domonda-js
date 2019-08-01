/**
 *
 * FormContext
 *
 */

import { createContext, useContext } from 'react';
import { Form as DomondaForm, createForm } from '@domonda/form';

const [defaultForm] = createForm<any>();
export const FormContext = createContext(defaultForm);

export function useFormContext<DefaultValues extends object>(): DomondaForm<DefaultValues> {
  return useContext<DomondaForm<DefaultValues>>(FormContext);
}
