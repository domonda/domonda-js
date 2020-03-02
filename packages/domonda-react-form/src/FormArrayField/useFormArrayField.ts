/**
 *
 * FormField/useFormArrayField
 *
 */

import { useCallback } from 'react';
import { Transformer } from '@domonda/plumb';
import { FormTag } from '@domonda/form';
import { useFormField, UseFormFieldProps } from '../FormField';

export interface UseFormArrayFieldProps extends UseFormFieldProps<any[] | null | undefined> {
  required?: boolean;
  allowEmptyArray?: boolean;
}

export interface FormArrayFieldAPI {
  items: any[] | null;
  add: () => void;
  remove: () => void;
}

export function useFormArrayField(props: UseFormArrayFieldProps): FormArrayFieldAPI {
  const { required, allowEmptyArray, ...formFieldProps } = props;

  const transformer = useCallback<Transformer<any[] | null | undefined, FormTag>>(
    (values) => {
      if (!values || values.length === 0) {
        if (allowEmptyArray) {
          return [];
        } else {
          return null;
        }
      }

      return values;
    },
    [allowEmptyArray],
  );

  const formField = useFormField<any[] | null | undefined>({ transformer, ...formFieldProps });

  const { value, setValue } = formField;

  let filtered = false;

  const items =
    !value || value.length === 0 || (value.length === 1 && value[0] === undefined)
      ? null
      : value.filter((val) => {
          if (val === undefined) {
            filtered = true;
            return false;
          }
          return true;
        });

  if (filtered) {
    setTimeout(() => setValue(items), 0);
  }

  return {
    items,
    add: () => setValue((items && [...items, null]) || [null]),
    remove: () =>
      setValue(items && items.length > 1 ? items.slice(0, -1) : allowEmptyArray ? [] : null),
  };
}
