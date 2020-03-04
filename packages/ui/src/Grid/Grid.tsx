/**
 *
 * Grid
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';

import { useStyles, useTheme } from '../styles/treat';
import { Theme } from '../styles/theme';

import * as styles from './Grid.treat';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /** A container can also be in an area of another container. */
  area?: string;
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /** Makes the current component a container. (display: grid;) */
  container?: boolean;
  fill?: boolean;
  /** Equivalent of `gridGap`. (The gap between grid rows and columns) */
  gap?: string | ((theme: Theme) => string);
  overflowing?: boolean;
  /** Equivalent of `gridTemplate`. Its important to define the grid `areas` because the grid items use it! */
  template?: string | ((theme: Theme) => string);
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(props, ref) {
  const {
    children,
    className,
    component: Component = 'div' as React.ElementType<React.ComponentPropsWithRef<'div'>>,
    container,
    area,
    fill,
    gap,
    overflowing,
    style,
    template,
    ...rest
  } = props;

  const classes = useStyles(styles);
  const theme = useTheme();

  const derivedStyle = useMemo(() => {
    if (!template && !area && !gap && !style) {
      return undefined;
    }

    return {
      gridTemplate: template
        ? typeof template === 'function'
          ? template(theme)
          : template
        : undefined,
      gridArea: area ? area : undefined,
      gridGap: gap ? (typeof gap === 'function' ? gap(theme) : gap) : undefined,
      ...style,
    };
  }, [theme, template, area, gap, style]);

  return (
    <Component
      ref={ref as any}
      className={
        clsx(
          container && classes.container,
          fill && classes.fill,
          overflowing && classes.overflowing,
          className,
        ) || undefined
      }
      style={derivedStyle}
      {...rest}
    >
      {children}
    </Component>
  );
});
