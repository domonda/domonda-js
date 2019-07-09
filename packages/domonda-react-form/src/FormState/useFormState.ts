/**
 *
 * FormState/useFormState
 *
 */

import { Form as RxForm, FormState as RxFormState } from '@domonda/form';
import { useValue } from '../hooks';
import { map } from 'rxjs/operators';
import { useFormContext } from '../FormContext';

export type UseFormStateSelector<DV extends object, V> = (state: RxFormState<DV>) => V;

export function useFormState<DefaultValues extends object, V>(
  selector: UseFormStateSelector<DefaultValues, V>,
): [V, RxForm<DefaultValues>] {
  const form = useFormContext<DefaultValues>();

  const value = useValue(() => form.$.pipe(map(selector)), () => selector(form.$.value), [
    selector,
  ]);

  return [value, form];
}
