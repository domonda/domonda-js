/**
 *
 * useQueryParams
 *
 */

import { useRef, useState, useLayoutEffect, useContext, useCallback } from 'react';
import { QueryModel, parseQueryParams, defaultQueryParams, stringify } from './queryParams';
import { QueryParamsContext } from './QueryParamsContext';
import { deepEqual } from 'fast-equals';
import { Location } from 'history';

export interface UseQueryParamsProps<T, S> {
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
  /**
   * Selects a part of the result to return and updates only when the selected result changes.
   */
  selector?: (params: T) => S;
}

export type UseQueryParamsResult<T, S> = [
  S,
  (selectedParmasOrUpdater: Partial<T> | ((currSelectedParams: T) => Partial<T>)) => void,
];

function defaultSelector<T, S>(params: T) {
  return (params as any) as S;
}

/**
 * Parses the current URL query string following the `model`.
 * Updating the params on every location change.
 */
export function useQueryParams<T, S = T>(
  model: QueryModel<T>,
  props: UseQueryParamsProps<T, S> = {},
): UseQueryParamsResult<T, S> {
  const history = useContext(QueryParamsContext);
  if (!history) {
    throw new Error(
      '@domonda/query-params history not defined! Consider using `QueryParamsProvider` with the current `history` object.',
    );
  }

  const { once, onPathname, disableReplace, selector = defaultSelector } = props;

  const forceUpdate = useForceUpdate();

  // use a refs to avoid unnecessary effect calls
  const onPathnameRef = useRef(onPathname);
  if (onPathnameRef.current !== onPathname) {
    onPathnameRef.current = onPathname;
  }
  const queryParamsRef = useRef(parseQueryParams(history.location.search, model));
  const selectedQueryParamsRef = useRef(selector(queryParamsRef.current));
  const replacingRef = useRef(false); // prevents triggering the listener recursively when replacing the URL
  const updateQueryParams = useCallback(
    (location: Location) => {
      const nextQueryParms = parseQueryParams(location.search, model);
      if (!deepEqual(queryParamsRef.current, nextQueryParms)) {
        queryParamsRef.current = nextQueryParms;

        const selectedNextQueryParams = selector(nextQueryParms);
        if (
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore because the default selector just passes the T back
          selectedNextQueryParams === nextQueryParms || // <- optimization to avoid double deep equal check when defaultSelector is used
          !deepEqual(selectedQueryParamsRef.current, selectedNextQueryParams)
        ) {
          selectedQueryParamsRef.current = selectedNextQueryParams;
          forceUpdate();
        }
      }

      if (!disableReplace) {
        const actualQueryString = stringify(queryParamsRef.current, { prependQuestionMark: true });
        if (actualQueryString !== history.location.search) {
          replacingRef.current = true;
          history.replace({
            search: actualQueryString,
          });
          replacingRef.current = false;
        }
      }
    },
    [selector, model, disableReplace],
  );

  useLayoutEffect(() => {
    function filteredLocationUpdate(location: Location) {
      if (
        !replacingRef.current &&
        (!onPathnameRef.current || onPathnameRef.current === location.pathname)
      ) {
        updateQueryParams(location);
      }
    }

    // guarantee history location consistency. sometimes
    // history gets updated before the effect is even
    // called, this results in stale location state.
    // to avoid having such states, we compare the location
    // on every effect call and update local state
    filteredLocationUpdate(history.location);

    if (!once) {
      const unlisten = history.listen(filteredLocationUpdate);
      return unlisten;
    }
  }, [updateQueryParams, once]);

  return [
    selectedQueryParamsRef.current,
    useCallback((paramsOrUpdater) => {
      const nextParams = {
        ...defaultQueryParams(model),
        ...(paramsOrUpdater instanceof Function
          ? paramsOrUpdater(queryParamsRef.current)
          : paramsOrUpdater),
      };

      if (!deepEqual(queryParamsRef.current, nextParams)) {
        history.push({
          // if we provided the onPathname, then updating the values should push to the route
          pathname: onPathnameRef.current ? onPathnameRef.current : history.location.pathname,
          search: stringify(nextParams),
        });
      }
    }, []),
  ];
}

// Force updates the hook.
function useForceUpdate() {
  const [, setCounter] = useState(0);
  const forceUpdate = useCallback(() => setCounter((counter) => counter + 1), []);
  return forceUpdate;
}
