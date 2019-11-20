/**
 *
 * useQueryParams
 *
 */

import { useMemo, useRef, useState, useLayoutEffect, useContext, useCallback } from 'react';
import { QueryModel, parseQueryParams, stringify } from './queryParams';
import { QueryParamsContext } from './QueryParamsContext';
import { deepEqual, shallowEqual } from 'fast-equals';

export interface UseQueryParamsProps {
  /**
   * Parsed values will update only when the current pathname matches `onPathname`.
   */
  onPathname?: string;
  /**
   * Get the params once (only on mount).
   */
  once?: boolean;
  /**
   * Disables replacing the URL to match exactly the actual query paramaters.
   */
  disableReplace?: boolean;
}

export type UseQueryParamsReturn<T> = [T, (parmasOrUpdater: T | ((currParams: T) => T)) => void];

/**
 * Parses the current URL query string following the `model`.
 * Updating the params on every location change.
 */
export function useQueryParams<T>(
  model: QueryModel<T>,
  props: UseQueryParamsProps = {},
): UseQueryParamsReturn<T> {
  const history = useContext(QueryParamsContext);
  if (!history) {
    throw new Error(
      '@domonda/query-params history not defined! Consider using `QueryParamsProvider` with the current `history` object.',
    );
  }

  const { once, onPathname, disableReplace } = props;

  const [location, setLocation] = useState(history.location);
  const { pathname, search: queryString } = location;

  useLayoutEffect(() => {
    // guarantee history location consistency. sometimes
    // history gets updated before the effect is even
    // called, this results in stale location state.
    // to avoid having such states, we compare the location
    // on every effect call and update local state
    if (history.location !== location) {
      // TODO-db-190830 write tests for the above mentioned case
      setLocation(history.location);
    }

    if (!once) {
      const unlisten = history.listen((loc) => setLocation(loc));
      return unlisten;
    }
  }, [once]);

  // we want to memoize the model so that we can memoize the query string parser
  const memoModel = useShallowMemoOnValue(model);

  // parse the query string on every query or model change change
  const queryParams = useMemo(() => parseQueryParams(queryString, memoModel), [
    queryString,
    memoModel,
  ]);

  // we mamoize the query params to guarantee same object reference on shallowly equal params
  const memoQueryParams = useShallowMemoOnValue(queryParams);

  // update the values reference only on the locked pathname
  const queryParamsRef = useRef<T>(memoQueryParams);
  if (!onPathname || onPathname === pathname) {
    queryParamsRef.current = memoQueryParams;
  }

  useLayoutEffect(() => {
    if (!disableReplace) {
      const actualQueryString = stringify(queryParamsRef.current, { prependQuestionMark: true });
      if (actualQueryString !== history.location.search) {
        history.replace({
          search: actualQueryString,
        });
      }
    }
  }, [disableReplace, queryParamsRef.current]);

  return [
    queryParamsRef.current,
    useCallback((paramsOrUpdater: T | ((currParams: T) => T)) => {
      const nextParams =
        paramsOrUpdater instanceof Function
          ? paramsOrUpdater(queryParamsRef.current)
          : paramsOrUpdater;

      if (!deepEqual(queryParamsRef.current, nextParams)) {
        history.push({
          // if we provided the onPathname, then updating the values should push to the route
          pathname: onPathname ? onPathname : pathname,
          search: stringify(nextParams),
        });
      }
    }, []),
  ];
}

// Memoizes the passed value by performing a shallow compare.
export function useShallowMemoOnValue<T>(value: T): T {
  const ref = useRef<T>(value);
  if (!shallowEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}
