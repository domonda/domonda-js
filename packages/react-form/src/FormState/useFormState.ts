/**
 *
 * FormState/useFormState
 *
 */

import { Form as DomondaForm, FormState as DomondaFormState } from '@domonda/form';
import { UsePlumbStateProps, useMappedPlumbState } from '@domonda/react-plumb';
import { useFormContext } from '../FormContext';

export type UseFormStateSelector<DV extends Record<string, any>, V> = (
  state: DomondaFormState<DV>,
) => V;

export type UseFormStateProps<V> = Omit<UsePlumbStateProps<V, any>, 'plumb'>;

export function useFormState<DefaultValues extends Record<string, any>, V>(
  selector: UseFormStateSelector<DefaultValues, V>,
  props?: UseFormStateProps<V>,
): [V, DomondaForm<DefaultValues>] {
  const form = useFormContext<DefaultValues>();
  const [state] = useMappedPlumbState({
    plumb: form.plumb,
    mapper: selector,
    ...props,
  });
  return [state, form];
}
