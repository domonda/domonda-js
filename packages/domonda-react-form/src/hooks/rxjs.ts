/**
 *
 * hooks
 *
 * React hooks for handling RxJS streams.
 *
 */

import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { useState, useEffect, DependencyList } from 'react';

/** Subscribes to the observable and dispatches distinct values. */
export function useValue<V>(makeObservable: () => Observable<V>): V | undefined;
export function useValue<V>(
  makeObservable: () => Observable<V>,
  getInitialValue: () => V,
  deps?: DependencyList,
): V;
export function useValue<V>(
  makeObservable: () => Observable<V>,
  getInitialValue?: () => V,
  deps?: DependencyList,
): V | undefined {
  const [value, setValue] = useState(() => getInitialValue && getInitialValue());

  let mounted = true;
  useEffect(
    () => () => {
      mounted = false;
    },
    [],
  );

  useEffect(() => {
    // make the source stream
    const source$ = makeObservable();
    // subscribe to it with the `distinctUntilChanged` operator to prevent unnecessary updates
    const subscription = source$
      .pipe(distinctUntilChanged())
      // we set the value in a `setTimeout` because we want
      // to finish the current event loop before updating.
      // guaranteeing that the hook will receiving ALL dispatched values
      .subscribe((arrivingValue) =>
        setTimeout(() => {
          if (mounted) {
            setValue(arrivingValue);
          }
        }, 0),
      );
    // cleanup by unsubscribing
    return () => subscription.unsubscribe();
  }, deps || []);

  return value;
}
