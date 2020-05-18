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

// consists of numbers, optional floating point, does not begin with zero
// (valid, native, `Number`s in JS never start with zero)
const NUMBER_REGEX = /^(?!0)([-0-9]+)(\.[0-9]+)?$/;

function isNaN(num: number) {
  // only NaN is not equal to itself
  return num !== num;
}

export function strictUriEncode(str: string) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`,
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
    defaultValue: (() => V[K]) | V[K];
    validate?: (value: V[K]) => boolean;
  };
};

/** Parses the URL query string following the `QueryModel` definitions. */
export function parseQueryParams<V>(queryString: string, model: QueryModel<V>): V {
  const parsedQuery = qsParse(queryString, {
    arrayFormat: ARRAY_FORMAT,
  }) as {
    [K in keyof V]: any;
  };

  const parsedValues = (Object.keys(model) as (keyof V)[]).reduce((accumulator, key) => {
    const { type, validate, defaultValue } = model[key];

    const parsedAndValidatedQueryValue = (() => {
      let parsedQueryValue = parsedQuery[key];
      if (parsedQueryValue) {
        switch (type) {
          case 'boolean':
            const maybeBool = String(parsedQueryValue).toLowerCase();
            if (maybeBool === 't' || maybeBool === 'true' || maybeBool === '1') {
              parsedQueryValue = true;
            } else {
              parsedQueryValue = false;
            }
            break;
          case 'number':
            parsedQueryValue = parseFloat(parsedQueryValue);
            break;
          case 'array': {
            if (parsedQueryValue.length === 1 && parsedQueryValue[0] == null) {
              parsedQueryValue = [];
            } else {
              // parse numbers, wherever possible
              parsedQueryValue = (parsedQueryValue as string[]).map((val) => {
                if (NUMBER_REGEX.test(val)) {
                  const maybeNum = parseFloat(val);
                  if (!isNaN(maybeNum)) {
                    return maybeNum;
                  }
                }
                return val;
              });
            }
            break;
          }
          case 'date':
            if (parsedQueryValue) {
              parsedQueryValue = stripTime(parseISOToDate(parsedQueryValue));
              if (isNaN((parsedQueryValue as Date).getTime())) {
                return undefined;
              }
            }
            break;
        }
      }

      if (parsedQueryValue !== undefined && validate && !validate(parsedQueryValue as any)) {
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

/** Following the model, gives the query params populated with default values. */
export function defaultQueryParams<V>(model: QueryModel<V>) {
  return parseQueryParams<V>('', model);
}

function deepFreeze<T extends { [key: string]: any }>(object: T): T {
  Object.freeze(object);
  Object.getOwnPropertyNames(object).forEach((name) => {
    const property = object[name];
    if (property && typeof property === 'object' && !Object.isFrozen(property)) {
      deepFreeze(property);
    }
  });
  return object;
}
