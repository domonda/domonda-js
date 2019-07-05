/**
 *
 * Grid
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Theme } from '../styles';

// decorate
import { decorate, Decorate } from './decorate';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
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
    classes,
    className,
    component: Component = 'div' as React.ElementType<React.ComponentPropsWithRef<'div'>>,
    container,
    template,
    area,
    gap,
    fill,
    overflowing,
    ...rest
  } = props;

  return (
    <Component
      {...rest}
      ref={ref as any}
      className={
        clsx(
          container && classes.container,
          template && classes.template,
          area && classes.area,
          gap && classes.gap,
          fill && classes.fill,
          overflowing && classes.overflowing,
          className,
        ) || undefined
      }
    >
      {children}
    </Component>
  );
});

Grid.displayName = 'Grid';

const StyledGrid = decorate(Grid);
export { StyledGrid as Grid };
