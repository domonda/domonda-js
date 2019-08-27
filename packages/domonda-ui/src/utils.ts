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
