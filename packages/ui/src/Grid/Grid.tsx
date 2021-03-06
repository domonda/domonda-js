/**
 *
 * Grid
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Theme } from '../styles';

// decorate
import { decorate, Decorate } from './decorate';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Partial<Decorate['classes']>;
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /** Makes the current component a container. (display: grid;) */
  container?: boolean;
  /** Equivalent of `gridTemplate`. Its important to define the grid `areas` because the grid items use it! */
  template?: string | ((theme: Theme) => string);
  /** A container can also be in an area of another container. */
  area?: string;
  /** Equivalent of `gridGap`. (The gap between grid rows and columns) */
  gap?: string | ((theme: Theme) => string);
  fill?: boolean;
  overflowing?: boolean;
}

const Grid = React.forwardRef<HTMLElement, GridProps & Decorate>(function Grid(props, ref) {
  const {
    children,
    theme,
    classes,
    className,
    component: Component = 'div' as React.ElementType<React.ComponentPropsWithRef<'div'>>,
    container,
    template,
    area,
    gap,
    fill,
    overflowing,
    style,
    ...rest
  } = props;

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
      {...rest}
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
    >
      {children}
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Grid.displayName = 'Grid';
}

const StyledGrid = decorate(Grid);
export { StyledGrid as Grid };
