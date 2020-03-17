/**
 *
 * FormField/useFormArrayField
 *
 */

import { useCallback, useMemo } from 'react';
import { Transformer } from '@domonda/plumb';
import { FormTag } from '@domonda/form';
import { useFormField, UseFormFieldProps } from '../FormField';

export interface UseFormArrayFieldProps extends UseFormFieldProps<any[] | null | undefined> {
  required?: boolean;
  allowEmptyArray?: boolean;
}

export interface FormArrayFieldAPI {
  items: any[] | null | undefined;
  insert: (value: any, afterIndex?: number) => void; // inserts an element (optionally after an index)
  remove: (atIndex?: number) => void; // remove element at index (optionally at an index)
}

export function useFormArrayField(props: UseFormArrayFieldProps): FormArrayFieldAPI {
  const { required, allowEmptyArray, ...formFieldProps } = props;

  const { value: items, setValue: setItems } = useFormField<any[] | null | undefined>({
    transformer: useCallback<Transformer<any[] | null | undefined, FormTag>>(
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
    ),
    ...formFieldProps,
  });

  return useMemo(
    () => ({
      items,
      insert: (
        // defaults to inserting `null`
        value = null,
        // defaults to inserting after list item
        afterIndex = (items || []).length - 1,
      ) => {
        if (!items) {
          return setItems([value]);
        }
        return setItems([...items.slice(0, afterIndex + 1), value, ...items.slice(afterIndex + 1)]);
      },
      remove: (
        // defaults to removing the last element in the array
        atIndex = (items || []).length - 1,
      ) => setItems((items || []).filter((_0, index) => index !== atIndex)),
    }),
    [items],
  );
}
