/**
 *
 * FormState/useFormState
 *
 */

import { Form as DomondaForm, FormState as DomondaFormState } from '@domonda/form';
import { useValue } from '../hooks';
import { map } from 'rxjs/operators';
import { useFormContext } from '../FormContext';

export type UseFormStateSelector<DV extends object, V> = (state: DomondaFormState<DV>) => V;

export function useFormState<DefaultValues extends object, V>(
  selector: UseFormStateSelector<DefaultValues, V>,
): [V, DomondaForm<DefaultValues>] {
  const form = useFormContext<DefaultValues>();

  const value = useValue(() => form.$.pipe(map(selector)), () => selector(form.$.value), [
    form,
    selector,
  ]);

  return [value, form];
}
