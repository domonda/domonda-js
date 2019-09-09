/**
 *
 * useDeepMemoOnValue
 *
 */

import { useRef } from 'react';
import { deepEqual, shallowEqual } from 'fast-equals';

// Memoizes the passed value by performing the compairson defined in `valueIsEqual`;
export function useValueIsEqual<T>(value: T, valueIsEqual: (prev: T, next: T) => boolean): T {
  const ref = useRef<T>(value);
  if (!valueIsEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}

// Memoizes the passed value by performing a deep compare.
export function useDeepMemoOnValue<T>(value: T): T {
  return useValueIsEqual(value, deepEqual);
}

// Memoizes the passed value by performing a shallow compare.
export function useShallowMemoOnValue<T>(value: T): T {
  return useValueIsEqual(value, shallowEqual);
}
