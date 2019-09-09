/**
 *
 * useDeepMemoOnValue
 *
 */

import { useRef } from 'react';
import { deepEqual, shallowEqual } from 'fast-equals';

// Memoizes the passed value by performing a deep compare.
export function useDeepMemoOnValue<T>(value: T): T {
  const ref = useRef<T>(value);
  if (!deepEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}

// Memoizes the passed value by performing a shallow compare.
export function useShallowMemoOnValue<T>(value: T): T {
  const ref = useRef<T>(value);
  if (!shallowEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}
