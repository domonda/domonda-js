/**
 *
 * hooks/plumb
 *
 * React hooks for handling Plumbs.
 *
 */

import { useState, useLayoutEffect, useRef } from 'react';
import { Plumb, shallowEqual } from '@domonda/plumb';

export interface UsePlumbProps {
  /**
   * when many updates happen immediatly react often displays
   * the order of received values incorrectly. setting this
   * flag to true will update the state in a `setTimeout(() => {}, 0)`
   * therefore guarenteeing the value order because it allows
   * react renders to finish before triggering `setState`
   */
  setWithTimeout?: boolean;
}

export function usePlumb<T>(plumb: Plumb<T>, props: UsePlumbProps = {}): T {
  const { setWithTimeout } = props;

  const [state, setState] = useState(() => plumb.state);

  const stateRef = useRef<T>(state);
  if (stateRef.current !== state) {
    stateRef.current = state;
  }

  useLayoutEffect(() => {
    const maybeNewPlumbState = plumb.state;
    if (stateRef.current !== maybeNewPlumbState) {
      setState(maybeNewPlumbState);
    }
  }, [plumb]);

  useLayoutEffect(() => {
    const subscription = plumb.subscribe((nextState) => {
      const performSetState = () => {
        if (!shallowEqual(stateRef.current, nextState)) {
          setState(nextState);
        }
      };

      if (setWithTimeout) {
        setTimeout(performSetState, 0);
      } else {
        performSetState();
      }
    });
    return () => {
      subscription.dispose();
    };
  }, [plumb, setWithTimeout]);

  return state;
}

export function useMappedPlumb<T, K>(
  plumb: Plumb<T>,
  mapper: (state: T) => K,
  props: UsePlumbProps = {},
): K {
  const { setWithTimeout } = props;

  const [state, setState] = useState(() => mapper(plumb.state));

  const stateRef = useRef<K>(state);
  if (stateRef.current !== state) {
    stateRef.current = state;
  }

  const initRef = useRef(false);
  useLayoutEffect(() => {
    if (initRef.current) {
      const maybeNewPlumbState = mapper(plumb.state);
      if (stateRef.current !== maybeNewPlumbState) {
        setState(maybeNewPlumbState);
      }
    }
    initRef.current = true;
  }, [plumb]);

  useLayoutEffect(() => {
    const subscription = plumb.subscribe((nextState) => {
      const performSetState = () => {
        const mappedState = mapper(nextState);
        if (!shallowEqual(stateRef.current, mappedState)) {
          setState(mappedState);
        }
      };

      if (setWithTimeout) {
        setTimeout(performSetState, 0);
      } else {
        performSetState();
      }
    });
    return () => {
      subscription.dispose();
    };
  }, [plumb, mapper]);

  return state;
}
