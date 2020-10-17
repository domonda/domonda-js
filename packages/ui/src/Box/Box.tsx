/**
 *
 * Box
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';

import { useStyles, useTheme } from 'treat';
import { Space } from '../styles/spacing';

import * as styles from './Box.treat';

type Spacing =
  | Exclude<Space, 'none'> // top
  | [Space, Space] // top-bottom left-right
  | [Space, Space, Space] // top left-right bottom
  | [Space, Space, Space, Space]; // top right bottom left

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  fill?: boolean;
  margin?: Spacing;
  overflowing?: boolean;
  padding?: Spacing;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(props, ref) {
  const {
    children,
    className,
    component: Component = 'div' as React.ElementType<React.ComponentPropsWithRef<'div'>>,
    fill,
    margin,
    overflowing,
    padding,
    style,
    ...rest
  } = props;

  const classes = useStyles(styles);
  const theme = useTheme();

  const derivedStyle = useMemo(() => {
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
  }, [margin, padding, style, theme]);

  return (
    <Component
      ref={ref as any}
      className={clsx(
        classes.root,
        fill && classes.fill,
        overflowing && classes.overflowing,
        className,
      )}
      style={derivedStyle}
      {...rest}
    >
      {children}
    </Component>
  );
});
