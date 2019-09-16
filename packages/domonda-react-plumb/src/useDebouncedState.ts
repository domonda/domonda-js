/**
 *
 * useDebouncedState
 *
 */

import { useState, useEffect, SetStateAction, Dispatch } from 'react';

/** Hook allowing you to debounce a state change. */
export function useDebouncedState<S>(
  delay: number,
): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
export function useDebouncedState<S>(
  delay: number,
  initialState: S,
): [S, Dispatch<SetStateAction<S>>];
export function useDebouncedState<S>(
  delay: number,
  initialState?: S,
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [state, setState] = useState(() => initialState);
  const [debouncedState, setDebouncedState] = useState(() => state);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedState(state), delay);
    return () => clearTimeout(timeout);
  }, [state]);

  return [debouncedState, setState];
}
