/**
 *
 * FormField/useFormArrayField
 *
 */

import { useCallback, useMemo } from 'react';
import { Transformer } from '@domonda/plumb';
import { FormTag } from '@domonda/form';
import { useFormField, UseFormFieldProps } from '../FormField';

export type UseFormArrayFieldProps<V, AllowEmptyArray extends boolean = false> = UseFormFieldProps<
  AllowEmptyArray extends true ? V[] : V[] | null
> & {
  required?: boolean;
} & (AllowEmptyArray extends true ? { allowEmptyArray: true } : { allowEmptyArray?: false });

export interface FormArrayFieldAPI<V, AllowEmptyArray extends boolean = false> {
  items: AllowEmptyArray extends true ? V[] : V[] | null;
  insert: (value: V, afterIndex?: number) => void; // inserts an element (optionally after an index)
  remove: (atIndex?: number) => void; // remove element at index (optionally at an index)
}

export function useFormArrayField<V, AllowEmptyArray extends boolean = false>(
  props: UseFormArrayFieldProps<V, AllowEmptyArray>,
): FormArrayFieldAPI<V, AllowEmptyArray> {
  const { required, allowEmptyArray, ...formFieldProps } = props;

  const { value: items, setValue: setItems } = useFormField<
    AllowEmptyArray extends true ? V[] : V[] | null
  >({
    transformer: useCallback<Transformer<AllowEmptyArray extends true ? V[] : V[] | null, FormTag>>(
      (values) => {
        if (!values || ((values as any) as V[]).length === 0) {
          if (allowEmptyArray) {
            return [];
          } else {
            return null as any;
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
        value,
        // defaults to inserting after list item
        afterIndex = Array.isArray(items) ? items.length - 1 : 0,
      ) => {
        if (!items) {
          return setItems([value] as any);
        }
        return setItems([
          ...items.slice(0, afterIndex + 1),
          value,
          ...items.slice(afterIndex + 1),
        ] as any);
      },
      remove: (
        // defaults to removing the last element in the array
        atIndex,
      ) => {
        const isArray = Array.isArray(items);
        if (atIndex === undefined && isArray) {
          atIndex = items!.length - 1;
        }
        setItems(isArray ? items!.filter((_0, index) => index !== atIndex) : (null as any));
      },
    }),
    [items],
  );
}
