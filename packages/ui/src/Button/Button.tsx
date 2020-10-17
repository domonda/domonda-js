/**
 *
 * Button
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Color } from '../styles/palette';
import { Size } from '../styles/sizes';
import { useStyles } from 'react-treat';
import * as classesRef from './Button.treat';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  variant?: keyof typeof classesRef.variants; // default: `secondary`
  size?: 'inherit' | Size; // default: `regular`
  color?: Color; // default: `accent`
  dense?: boolean;
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      children,
      className,
      component: Component = 'button' as React.ElementType<React.ComponentPropsWithRef<'button'>>,
      variant = 'secondary',
      size = 'regular',
      color = 'accent',
      dense,
      disabled,
      ...rest
    } = props;
    const classes = useStyles(classesRef);

    return (
      <Component
        {...rest}
        ref={ref as any}
        className={clsx(
          classes.root,
          classes.variants[variant],
          disabled && classes.disabled,
          dense && classes.dense,
          classes.colors[color],
          classes.sizes[size],
          className,
        )}
        disabled={disabled}
        type="button"
      >
        <span className={clsx(classes.label, dense && classes.dense, classes.sizes[size])}>
          {children}
        </span>
      </Component>
    );
  },
);
