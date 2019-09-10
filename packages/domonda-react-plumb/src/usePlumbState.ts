/**
 *
 * usePlumbState
 *
 * React hooks for handling Plumbs.
 *
 */

import { useState, useLayoutEffect, useRef } from 'react';
import { Plumb } from '@domonda/plumb';
import { shallowEqual } from 'fast-equals';
import { usePlumbContext } from './PlumbContext';

export interface UsePlumbStateProps<S, T> {
  /**
   * the plumb instance to use. if undefined,
   * will use plumb from the context
   */
  plumb?: Plumb<S, T>;
  /**
   * when many updates happen immediatly react often displays
   * the order of received values incorrectly. setting this
   * flag to true will update the state in a `setTimeout(() => {}, 0)`
   * therefore guarenteeing the value order because it allows
   * react renders to finish before triggering `setValue`
   */
  setWithTimeout?: boolean;
  /**
   * compares the state and if the function returns true, the
   * hook will not update the internal state since its the same
   */
  stateIsEqual?: (prev: S, next: S) => boolean;
}

export function usePlumbState<S, T>(props: UsePlumbStateProps<S, T> = {}): [S, T | undefined] {
  const { plumb = usePlumbContext<S, T>(), setWithTimeout, stateIsEqual } = props;

  const [value, setValue] = useState(() => ({ state: plumb.state, lastTag: plumb.lastTag }));

  const valueRef = useRef<{ state: S; lastTag: T | undefined }>(value);
  if (valueRef.current !== value) {
    valueRef.current = value;
  }

  useLayoutEffect(() => {
    const maybeNewPlumbState = plumb.state;
    const maybeNewPlumbLastTag = plumb.lastTag;
    if (
      valueRef.current.state !== maybeNewPlumbState ||
      valueRef.current.lastTag !== maybeNewPlumbLastTag
    ) {
      setValue({ state: maybeNewPlumbState, lastTag: plumb.lastTag });
    }
  }, [plumb]);

  useLayoutEffect(() => {
    const subscription = plumb.subscribe((nextState, nextTag) => {
      const performSetState = () => {
        if (
          !(stateIsEqual || shallowEqual)(valueRef.current.state, nextState) ||
          valueRef.current.lastTag !== nextTag
        ) {
          setValue({ state: nextState, lastTag: nextTag });
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

  return [value.state, value.lastTag];
}

export interface PlumbStateProps<S, T> extends UsePlumbStateProps<S, T> {
  children: (state: S, lastTag: T | undefined) => React.ReactElement | null;
}

export function PlumbState<S, T>(props: PlumbStateProps<S, T>): React.ReactElement | null {
  const { children, ...rest } = props;
  const [state, lastTag] = usePlumbState(rest);
  return children(state, lastTag);
}

export interface UseMappedPlumbStateProps<S, K, T>
  extends Omit<UsePlumbStateProps<S, T>, 'stateIsEqual'> {
  mapper: (state: S) => K;
  stateIsEqual?: (prev: K, next: K) => boolean;
}

export function useMappedPlumbState<S, K, T>(
  props: UseMappedPlumbStateProps<S, K, T>,
): [K, T | undefined] {
  const { plumb = usePlumbContext<S, T>(), mapper, setWithTimeout, stateIsEqual } = props;

  const [value, setValue] = useState(() => ({
    state: mapper(plumb.state),
    lastTag: plumb.lastTag,
  }));

  const valueRef = useRef<{ state: K; lastTag: T | undefined }>(value);
  if (valueRef.current !== value) {
    valueRef.current = value;
  }

  const initRef = useRef(false);
  useLayoutEffect(() => {
    if (initRef.current) {
      const maybeNewPlumbState = mapper(plumb.state);
      const maybeNewPlumbLastTag = plumb.lastTag;
      if (
        valueRef.current.state !== maybeNewPlumbState ||
        valueRef.current.lastTag !== maybeNewPlumbLastTag
      ) {
        setValue({ state: maybeNewPlumbState, lastTag: maybeNewPlumbLastTag });
      }
    }
    initRef.current = true;
  }, [plumb]);

  useLayoutEffect(() => {
    const subscription = plumb.subscribe((nextState, nextTag) => {
      const performSetState = () => {
        const mappedState = mapper(nextState);
        if (
          !(stateIsEqual || shallowEqual)(valueRef.current.state, mappedState) ||
          valueRef.current.lastTag !== nextTag
        ) {
          setValue({ state: mappedState, lastTag: nextTag });
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

  return [value.state, value.lastTag];
}

export interface MappedPlumbStateProps<S, K, T> extends UseMappedPlumbStateProps<S, K, T> {
  children: (state: K, lastTag: T | undefined) => React.ReactElement | null;
}

export function MappedPlumbState<S, K, T>(
  props: MappedPlumbStateProps<S, K, T>,
): React.ReactElement | null {
  const { children, ...rest } = props;
  const [state, lastTag] = useMappedPlumbState(rest);
  return children(state, lastTag);
}
