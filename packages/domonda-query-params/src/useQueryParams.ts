/**
 *
 * useQueryParams
 *
 */

import { useRef, useState, useLayoutEffect, useContext, useCallback } from 'react';
import { QueryModel, parseQueryParams, stringify } from './queryParams';
import { QueryParamsContext } from './QueryParamsContext';
import { deepEqual } from 'fast-equals';
import { Location } from 'history';

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

  const forceUpdate = useForceUpdate();

  const locationRef = useRef(history.location);
  const { pathname, search: queryString } = locationRef.current;
  useLayoutEffect(() => {
    function filteredSetLocation(location: Location) {
      if (!onPathname || onPathname === location.pathname) {
        locationRef.current = location;
        forceUpdate();
      }
    }

    // guarantee history location consistency. sometimes
    // history gets updated before the effect is even
    // called, this results in stale location state.
    // to avoid having such states, we compare the location
    // on every effect call and update local state
    if (history.location !== locationRef.current) {
      // TODO-db-190830 write tests for the above mentioned case
      filteredSetLocation(history.location);
    }

    if (!once) {
      const unlisten = history.listen((loc) => filteredSetLocation(loc));
      return unlisten;
    }
  }, [once]);

  // use a ref for the query params to avoid unnecessary effect calls
  const queryParamsRef = useRef(parseQueryParams(queryString, model));

  // parse the query string on every query or model change and re-render only if the selected params change
  useLayoutEffect(() => {
    const nextQueryParms = parseQueryParams(queryString, model);
    if (!deepEqual(queryParamsRef.current, nextQueryParms)) {
      queryParamsRef.current = nextQueryParms;
      forceUpdate();
    }
  }, [queryString, model]);

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

// Force updates the hook.
export function useForceUpdate() {
  const [, setCounter] = useState(0);
  const forceUpdate = useCallback(() => setCounter((counter) => counter + 1), []);
  return forceUpdate;
}
