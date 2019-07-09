import { useRef } from 'react';
import { equal } from '@domonda/form';

// Memoizes the passed value by performing a deep compare.
export function useDeepMemoOnValue<T>(value: T): T {
  const ref = useRef<T>(value);
  if (!equal(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}
