/**
 *
 * utils
 *
 */

import React, { useMemo } from 'react';

export type ChainedFunction = ((...args: any[]) => void) | undefined | null;

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
export function createChainedFunction(...funcs: ChainedFunction[]): (...args: any[]) => never {
  return funcs.reduce<any>(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      return function chainedFunction(...args: any[]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore because of `this`
        acc.apply(this, args);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore because of `this`
        func.apply(this, args);
      };
    },
    () => {},
  );
}

export function ownerDocument(node: Node | null): Document {
  return (node && node.ownerDocument) || document;
}

export function ownerWindow(node: Node): Window {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

export function setRef<T>(
  ref: React.RefObject<T> | ((instance: T | null) => void) | string | null | undefined,
  value: T | null,
) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

export function useForkRef<T>(refA: React.LegacyRef<T>, refB: React.LegacyRef<T>): React.Ref<T> {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

export const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *
 * @param {function} fn
 */
export function useEventCallback<T extends Function>(fn: T): T {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return React.useCallback((event) => (0, ref.current)(event), []);
}

// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/3ffe3a5d82f6f561b82ff78d82b32a7d14aed558/js/src/modal.js#L512-L519
export function getScrollbarSize(): number {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '99px';
  scrollDiv.style.height = '99px';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.overflow = 'scroll';

  document.body.appendChild(scrollDiv);
  const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarSize;
}

// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word a the sentence.
// We only handle the first word.
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
