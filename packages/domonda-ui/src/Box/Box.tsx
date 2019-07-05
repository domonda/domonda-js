/**
 *
 * Box
 *
 */

import React from 'react';
import clsx from 'clsx';

// decorate
import { decorate, Decorate } from './decorate';

type Spacing =
  | number // top
  | [number, number] // top-bottom left-right
  | [number, number, number] // top left-right bottom
  | [number, number, number, number]; // top right bottom left

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  padding?: Spacing;
  margin?: Spacing;
  fill?: boolean;
  overflowing?: boolean;
}

const Box = React.forwardRef<HTMLElement, BoxProps & Decorate>(function Box(props, ref) {
  const {
    component: Component = 'div' as React.ElementType<React.ComponentPropsWithRef<'div'>>,
    children,
    classes,
    className,
    padding,
    margin,
    fill,
    overflowing,
    ...rest
  } = props;

  return (
    <Component
      {...rest}
      ref={ref as any}
      className={clsx(
        classes.root,
        padding != null && classes.padding,
        margin != null && classes.margin,
        fill && classes.fill,
        overflowing && classes.overflowing,
        className,
      )}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

const StyledBox = decorate(Box);
export { StyledBox as Box };
