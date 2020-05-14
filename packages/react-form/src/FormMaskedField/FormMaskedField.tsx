/**
 *
 * FormMaskedField/FormMaskedField
 *
 */

import React from 'react';
import {
  useFormMaskedField,
  UseFormMaskedFieldProps,
  FormMaskedFieldAPI,
} from './useFormMaskedField';
import { Mask } from './mask';

export type FormMaskedFieldProps<
  O extends Mask.AnyMaskedOptions = Mask.MaskedOptions<Mask.MaskedRegExp>
> = UseFormMaskedFieldProps<O> & {
  children: (api: FormMaskedFieldAPI<O>) => React.ReactElement | null;
};

export function FormMaskedField<
  O extends Mask.AnyMaskedOptions = Mask.MaskedOptions<Mask.MaskedRegExp>
>(props: FormMaskedFieldProps<O>): React.ReactElement | null {
  const { children, ...rest } = props;
  const api = useFormMaskedField<O>(rest as any);
  return children(api);
}
