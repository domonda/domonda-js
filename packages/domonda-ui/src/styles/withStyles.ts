import * as React from 'react';
import { Theme } from './theme';
import { default as jssWithStyles } from 'react-jss';

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
export type StyleRules<Props extends object, ClassKey extends string = string> = Record<
  ClassKey,
  CSSProperties | ((props: Props) => CSSProperties)
>;

export type ThemedStyleRules<Props extends object, ClassKey extends string = string> = (
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

export interface WithStylesOptions {
  index?: number;
  media?: string;
  meta?: string;
  classNamePrefix?: string;
  injectTheme?: boolean;
}

export type WithStyles<
  S extends Styles<any, any>,
  WithTheme extends boolean | undefined = false
> = (WithTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<ClassKeyOfStyles<S>>;
};

export function withStyles<S extends Styles<any, any>, Options extends WithStylesOptions = {}>(
  styles: S,
  options?: Options,
): <P extends WithStyles<S, Options['injectTheme']> & PropsOfStyles<S>>(
  Component: React.ComponentType<P>,
) => React.ComponentType<
  Pick<P, Exclude<keyof P, 'classes'>> & { classes?: Partial<P['classes']> }
> {
  return jssWithStyles(styles, {
    injectTheme: options && options.injectTheme,
    ...options,
  });
}
