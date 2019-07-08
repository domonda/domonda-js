import React from 'react';
import { Theme } from './theme';

export interface CSSProperties extends React.CSSProperties {
  // Allow pseudo selectors and media queries
  [key: string]: React.CSSProperties[keyof React.CSSProperties] | CSSProperties;
}

/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 *
 * if only `CSSProperties` are matched `Props` are inferred to `any`
 */
export type StyleRules<Props extends {}, ClassKey extends string = string> = Record<
  ClassKey,
  CSSProperties | ((props: Props) => CSSProperties)
>;

export type ThemedStyleRules<Props extends {}, ClassKey extends string = string> = (
  theme: Theme,
) => StyleRules<Props, ClassKey>;

export type Styles<Props extends {}, ClassKey extends string = string> =
  | StyleRules<Props, ClassKey>
  | ThemedStyleRules<Props, ClassKey>;

/**
 * infers the type of the theme used in the styles
 */
export type PropsOfStyles<S> = S extends Styles<infer Props> ? Props : {};

export type ClassKeyOfStyles<S> = S extends string
  ? S
  : S extends ThemedStyleRules<any, infer K>
  ? K
  : S extends StyleRules<any, infer K>
  ? K
  : never;

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

/**
 * This function doesn't really "do anything" at runtime, it's just the identity
 * function. Its only purpose is to defeat TypeScript's type widening when providing
 * style rules to `withStyles` which are a function of the `Theme`.
 *
 * @param styles a set of style mappings
 * @returns the same styles that were passed in
 */
export function createStyles<P extends {}, C extends string = string>(
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
export function makeCreateStyles<P extends {}>(): <C extends string>(
  styles: StyleRules<P, C> | ThemedStyleRules<P, C>,
) => StyleRules<P, C> | ThemedStyleRules<P, C> {
  return createStyles;
}
