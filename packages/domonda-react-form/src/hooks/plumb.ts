/**
 *
 * hooks/plumb
 *
 * React hooks for handling Plumbs.
 *
 */

import { useState, useLayoutEffect, useRef } from 'react';
import { Plumb, shallowEqual } from '@domonda/plumb';

export function usePlumb<T>(plumb: Plumb<T>): T {
  const [state, setState] = useState<T>(() => plumb.state);
  const stateRef = useRef<T>(state);
  if (stateRef.current !== state) {
    stateRef.current = state;
  }

  useLayoutEffect(() => {
    const subscription = plumb.subscribe((nextState) => {
      if (!shallowEqual(stateRef.current, nextState)) {
        setState(nextState);
      }
    });
    return () => {
      subscription.dispose();
    };
  }, [plumb]);

  return state;
}

export function useMappedPlumb<T, K>(plumb: Plumb<T>, mapper: (state: T) => K): K {
  const [state, setState] = useState<K>(() => mapper(plumb.state));
  const stateRef = useRef<K>(state);
  if (stateRef.current !== state) {
    stateRef.current = state;
  }

  useLayoutEffect(() => {
    const subscription = plumb.subscribe((nextState) => {
      const mappedState = mapper(nextState);
      if (!shallowEqual(stateRef.current, mappedState)) {
        setState(mappedState);
      }
    });
    return () => {
      subscription.dispose();
    };
  }, [plumb, mapper]);

  return state;
}
