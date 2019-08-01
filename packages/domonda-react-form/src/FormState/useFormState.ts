/**
 *
 * FormState/useFormState
 *
 */

import { Form as DomondaForm, FormState as DomondaFormState } from '@domonda/form';
import { useMappedPlumb } from '../hooks/plumb';
import { useFormContext } from '../FormContext';

export type UseFormStateSelector<DV extends object, V> = (state: DomondaFormState<DV>) => V;

export function useFormState<DefaultValues extends object, V>(
  selector: UseFormStateSelector<DefaultValues, V>,
): [V, DomondaForm<DefaultValues>] {
  const form = useFormContext<DefaultValues>();
  const value = useMappedPlumb(form.plumb, selector);
  return [value, form];
}
