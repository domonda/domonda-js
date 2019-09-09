/**
 *
 * usePlumb
 *
 */

import { useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { createPlumb, PlumbProps, Plumb } from '@domonda/plumb';
import { useShallowMemoOnValue, useValueIsEqual } from './useMemoOnValue';
import { shallowEqual } from 'fast-equals';

export interface UsePlumbProps<S, T> extends PlumbProps<S, T> {
  stateIsEqual?: (prev: S, next: S) => boolean;
}

export function usePlumb<S, T>(state: S, tag: T, props: UsePlumbProps<S, T> = {}): Plumb<S, T> {
  const { stateIsEqual, ...plumbProps } = props;

  const memoizedPlumbProps = useShallowMemoOnValue(plumbProps);

  const plumbRef = useRef<Plumb<S, T> | null>(null);
  const plumb = useMemo(() => {
    if (plumbRef.current && !plumbRef.current.disposed) {
      plumbRef.current.dispose();
    }
    return createPlumb(state, memoizedPlumbProps);
  }, [memoizedPlumbProps]);

  const memoizedState = useValueIsEqual(state, stateIsEqual || shallowEqual);
  useLayoutEffect(() => {
    if (plumbRef.current && !plumbRef.current.disposed) {
      plumbRef.current.next(memoizedState, tag);
    }
  }, [memoizedState]);

  if (plumbRef.current !== plumb) {
    plumbRef.current = plumb;
  }

  useEffect(
    () => () => {
      if (plumbRef.current && !plumbRef.current.disposed) {
        plumbRef.current.dispose();
      }
    },
    [],
  );

  return plumb;
}
