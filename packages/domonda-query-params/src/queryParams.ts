/**
 *
 * queryParams
 *
 */

import { stringify as qsStringify, parse as qsParse } from 'query-string';
import pickBy from 'lodash/pickBy';
import cloneDeepWith from 'lodash/cloneDeepWith';
import { parseISOToDate, stripTime } from './date';

const ARRAY_FORMAT: 'bracket' | 'index' | 'comma' | 'none' = 'bracket';

function isNaN(num: number) {
  // only NaN is not equal to itself
  return num !== num;
}

export function strictUriEncode(str: string) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (x) =>
      `%${x
        .charCodeAt(0)
        .toString(16)
        .toUpperCase()}`,
  );
}

/** Stringify function which omits `undefined`, `null`, and empty arrays. */
export function stringify(
  value: { [key: string]: any },
  props: { prependQuestionMark?: boolean } = {},
) {
  const { prependQuestionMark } = props;

  const str = qsStringify(
    pickBy(
      cloneDeepWith(value, (val) => {
        // persist empty arrays
        if (Array.isArray(val) && val.length === 0) {
          return [null];
        }
        // convert valid dates to iso strings
        if (val instanceof Date) {
          if (isNaN(val.getDate())) {
            return null;
          }
          return val.toISOString();
        }
      }),
      (part) => part != null,
    ),
    { arrayFormat: ARRAY_FORMAT },
  );

  if (prependQuestionMark && str.length > 0) {
    return '?' + str;
  }
  return str;
}

export type QueryModel<V> = {
  [K in keyof V]: {
    type: V[K] extends string
      ? 'string'
      : V[K] extends number
      ? 'number'
      : V[K] extends boolean
      ? 'boolean'
      : V[K] extends Date
      ? 'date'
      : V[K] extends any[]
      ? 'array'
      : string;
    defaultValue: (() => V[K]) | (V[K]);
    validate?: (value: V[K]) => boolean;
  };
};

/** Parses the URL query string following the `QueryModel` definitions. */
export function parseQueryParams<V>(queryString: string, model: QueryModel<V>): V {
  const parsedQuery = qsParse(queryString, {
    arrayFormat: ARRAY_FORMAT,
    parseBooleans: true,
    parseNumbers: true,
  }) as {
    [K in keyof V]: any;
  };

  const parsedValues = (Object.keys(model) as (keyof V)[]).reduce((accumulator, key) => {
    const { type, validate, defaultValue } = model[key];

    const parsedAndValidatedQueryValue = (() => {
      let parsedQueryValue = parsedQuery[key];

      if (
        type === 'string' &&
        (typeof parsedQueryValue === 'number' || typeof parsedQueryValue === 'boolean')
      ) {
        parsedQueryValue = parsedQueryValue.toString();
      } else if (
        type === 'array' &&
        parsedQueryValue &&
        parsedQueryValue.length === 1 &&
        parsedQueryValue[0] == null
      ) {
        parsedQueryValue = [];
      } else if (type === 'date' && parsedQueryValue) {
        parsedQueryValue = stripTime(parseISOToDate(parsedQueryValue));
        if (isNaN((parsedQueryValue as Date).getTime())) {
          return undefined;
        }
      }

      if (validate && parsedQueryValue !== undefined && !validate(parsedQueryValue as any)) {
        return undefined;
      }
      return parsedQueryValue;
    })();

    return deepFreeze({
      ...accumulator,
      [key]:
        parsedAndValidatedQueryValue === undefined
          ? typeof defaultValue === 'function'
            ? (defaultValue as () => V[keyof V])()
            : defaultValue
          : parsedAndValidatedQueryValue,
    });
  }, {});

  return parsedValues as V;
}

function deepFreeze<T extends { [key: string]: any }>(o: T): T {
  Object.freeze(o);

  var oIsFunction = typeof o === 'function';
  var hasOwnProp = Object.prototype.hasOwnProperty;

  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (
      hasOwnProp.call(o, prop) &&
      (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true) &&
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });

  return o;
}
