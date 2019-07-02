import { StyleRules, ThemedStyleRules } from './withStyles';

/**
 * This function doesn't really "do anything" at runtime, it's just the identity
 * function. Its only purpose is to defeat TypeScript's type widening when providing
 * style rules to `withStyles` which are a function of the `Theme`.
 *
 * @param styles a set of style mappings
 * @returns the same styles that were passed in
 */
export function createStyles<P extends object, C extends string = string>(
  styles: StyleRules<P, C> | ThemedStyleRules<P, C>,
): StyleRules<P, C> | ThemedStyleRules<P, C> {
  return styles;
}

/**
 * This function also doesn't really "do anything" at runtime, it's just the identity
 * function for defining what the `Props` would be.
 *
 * @param styles a set of style mappings
 * @returns the same styles that were passed in
 */
export function makeCreateStyles<P extends object>(): <C extends string>(
  styles: StyleRules<P, C> | ThemedStyleRules<P, C>,
) => StyleRules<P, C> | ThemedStyleRules<P, C> {
  return createStyles;
}
