/**
 *
 * Box
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Space } from '../styles/spacing';

// decorate
import { decorate, Decorate } from './decorate';

type Spacing =
  | Exclude<Space, 'none'> // top
  | [Space, Space] // top-bottom left-right
  | [Space, Space, Space] // top left-right bottom
  | [Space, Space, Space, Space]; // top right bottom left

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Partial<Decorate['classes']>;
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
    theme,
    classes,
    className,
    padding,
    margin,
    fill,
    overflowing,
    style,
    ...rest
  } = props;

  function deriveStyle() {
    if (padding == null && margin == null && !style) {
      return undefined;
    }

    return {
      padding:
        padding != null
          ? Array.isArray(padding)
            ? (theme as any).spacing(...padding)
            : theme.spacing(padding)
          : undefined,
      margin:
        margin != null
          ? Array.isArray(margin)
            ? (theme as any).spacing(...margin)
            : theme.spacing(margin)
          : undefined,
      ...style,
    };
  }

  return (
    <Component
      {...rest}
      ref={ref as any}
      className={clsx(
        classes.root,
        fill && classes.fill,
        overflowing && classes.overflowing,
        className,
      )}
      style={deriveStyle()}
    >
      {children}
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Box.displayName = 'Box';
}

const StyledBox = decorate(Box);
export { StyledBox as Box };
