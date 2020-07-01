/**
 *
 * FormContext
 *
 */

import { createContext, useContext } from 'react';
import { Form as DomondaForm, createForm } from '@domonda/form';

const [defaultForm] = createForm<any>();
export const FormContext = createContext(defaultForm);

export function useFormContext<DefaultValues extends Record<string, any>>(): DomondaForm<
  DefaultValues
> {
  return useContext<DomondaForm<DefaultValues>>(FormContext);
}
