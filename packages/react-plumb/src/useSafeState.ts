/**
 *
 * useSafeState
 *
 */

import { useState, useEffect, useRef, useCallback, SetStateAction, Dispatch } from 'react';

/** Safely manages the state by checking if the component is mounted before calling `setState`. */
export function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const mounted = useRef(true);
  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  const [state, internalSetState] = useState<S>(initialState);
  const setState = useCallback<Dispatch<SetStateAction<S>>>(
    (action) => {
      if (mounted.current) {
        internalSetState(action);
      }
    },
    [internalSetState],
  );

  return [state, setState];
}
