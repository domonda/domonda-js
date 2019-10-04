/**
 *
 * usePlumbState
 *
 * React hooks for handling Plumbs.
 *
 */

import { useLayoutEffect, useRef } from 'react';
import { Plumb } from '@domonda/plumb';
import { shallowEqual } from 'fast-equals';
import { usePlumbContext } from './PlumbContext';
import { useForceUpdate } from './useForceUpdate';

export interface UsePlumbStateProps<S, T> {
  /**
   * the plumb instance to use. if undefined,
   * will use plumb from the context
   */
  plumb?: Plumb<S, T>;
  /**
   * compares the state and if the function returns true, the
   * hook will not update the internal state since its the same
   */
  stateIsEqual?: (prev: S, next: S) => boolean;
}

export function usePlumbState<S, T>(props: UsePlumbStateProps<S, T> = {}): [S, T | undefined] {
  // NOTE: plumb is either provided or not
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { plumb = usePlumbContext<S, T>(), stateIsEqual } = props;

  // we prefer using ref + forceUpdate to guarantee latest value delivery
  const forceUpdate = useForceUpdate();
  const valueRef = useRef<{ state: S; lastTag: T | undefined }>({
    state: plumb.state,
    lastTag: plumb.lastTag,
  });

  useLayoutEffect(() => {
    const maybeNewPlumbState = plumb.state;
    if (valueRef.current.state !== maybeNewPlumbState) {
      valueRef.current = { state: maybeNewPlumbState, lastTag: plumb.lastTag };
      forceUpdate();
    }
  }, [plumb]);

  useLayoutEffect(() => {
    const subscription = plumb.subscribe((nextState, nextTag) => {
      if (!(stateIsEqual || shallowEqual)(valueRef.current.state, nextState)) {
        valueRef.current = { state: nextState, lastTag: nextTag };
        forceUpdate();
      }
    });
    return () => {
      subscription.dispose();
    };
  }, [plumb]);

  return [valueRef.current.state, valueRef.current.lastTag];
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
  // NOTE: plumb is either provided or not
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { plumb = usePlumbContext<S, T>(), mapper, stateIsEqual } = props;

  // we prefer using ref + forceUpdate to guarantee latest value delivery
  const forceUpdate = useForceUpdate();
  const valueRef = useRef<{ state: K; lastTag: T | undefined }>({
    state: mapper(plumb.state),
    lastTag: plumb.lastTag,
  });

  const initRef = useRef(true);
  useLayoutEffect(() => {
    if (!initRef.current) {
      const maybeNewPlumbState = mapper(plumb.state);
      if (valueRef.current.state !== maybeNewPlumbState) {
        valueRef.current = { state: maybeNewPlumbState, lastTag: plumb.lastTag };
        forceUpdate();
      }
    }
    initRef.current = false;
  }, [plumb]);

  useLayoutEffect(() => {
    const subscription = plumb.subscribe((nextState, nextTag) => {
      const mappedState = mapper(nextState);
      if (!(stateIsEqual || shallowEqual)(valueRef.current.state, mappedState)) {
        valueRef.current = { state: mappedState, lastTag: nextTag };
        forceUpdate();
      }
    });
    return () => {
      subscription.dispose();
    };
  }, [plumb, mapper]);

  return [valueRef.current.state, valueRef.current.lastTag];
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
