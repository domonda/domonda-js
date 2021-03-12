/**
 *
 * hooks
 *
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useForceUpdate() {
  const [, setCounter] = useState(0);
  const forceUpdate = useCallback(() => setCounter((counter) => counter + 1), []);
  return forceUpdate;
}

interface Size {
  width: number | null;
  height: number | null;
}

export function useSize<T extends Element>(): [React.Ref<T>, Size] {
  const forceUpdate = useForceUpdate();

  // reference used on the component which size wants to be tracked
  const [refEl, setRefEl] = useState<T | null>(null);

  // size state, updated on resize
  const [size, setSize] = useState<Size>({ width: null, height: null });

  // create the observer
  const observer = useMemo(
    () =>
      new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;

        // TODO-db-190408 throttle the `setState`
        setSize((currSize) =>
          currSize.width !== width || currSize.height !== height ? { width, height } : currSize,
        );
      }),
    [],
  );

  // observe the referenced component
  useEffect(() => {
    if (!refEl) {
      return;
    }

    observer.observe(refEl);
    window.setTimeout(forceUpdate, 0);
    return () => {
      observer.unobserve(refEl);
    };
  }, [refEl]);

  return [setRefEl, size];
}

export function setRef<T>(
  ref: React.RefObject<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null,
) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // @ts-expect-error: because the `current` object is flagged as readonly
    ref.current = value;
  }
}

export function useForkRef<T>(
  refA: React.RefObject<T> | ((instance: T | null) => void) | null | undefined,
  refB: React.RefObject<T> | ((instance: T | null) => void) | null | undefined,
) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: T) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
