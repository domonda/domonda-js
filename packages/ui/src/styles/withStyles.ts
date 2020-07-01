import * as React from 'react';
import { Theme } from './theme';
import { default as jssWithStyles } from 'react-jss';
import { Styles, ClassNameMap, ClassKeyOfStyles, PropsOfStyles } from './createStyles';

// auto-install
import { install } from './jss';
install();

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
  // eslint-disable-next-line @typescript-eslint/ban-types
> = (WithTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<ClassKeyOfStyles<S>>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export function withStyles<S extends Styles<any, any>, Options extends WithStylesOptions = {}>(
  styles: S,
  options?: Options,
): <P extends WithStyles<S, Options['injectTheme']> & PropsOfStyles<S>>(
  Component: React.ComponentType<P>,
) => React.ComponentType<Omit<P, 'theme' | 'classes'> & { classes?: Partial<P['classes']> }> {
  return jssWithStyles(styles as any, {
    injectTheme: options && options.injectTheme,
    ...options,
  }) as any;
}
