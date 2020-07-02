/**
 *
 * Typography
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Color } from '../styles/palette';
import { Size } from '../styles/sizes';
import { useStyles } from 'react-treat';
import * as classesRef from './Typography.treat';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: keyof typeof classesRef['variants']; // default: p
  inline?: boolean;
  size?: Size;
  bottomGutter?: Size;
  withPlaceholder?: boolean;
  wrap?: boolean;
  contained?: boolean;
  inherit?: boolean;
  color?: Color;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(function Typography(
  props,
  ref,
) {
  const {
    children,
    className,
    variant: Component = 'p',
    color,
    inline,
    bottomGutter,
    style,
    withPlaceholder,
    wrap,
    contained,
    inherit,
    size,
    ...rest
  } = props;
  const classes = useStyles(classesRef);

  return (
    <Component
      {...rest}
      ref={ref as any}
      className={clsx(
        classes.root,
        classes.variants[Component],
        color && classes.colors[color],
        size && classes.sizes[size],
        inline ? classes.inline : classes.block,
        bottomGutter && classes.bottomGutter[bottomGutter],
        wrap && classes.wrap,
        contained && classes.contained,
        inherit && classes.inherit,
        className,
      )}
    >
      {children}
    </Component>
  );
});
