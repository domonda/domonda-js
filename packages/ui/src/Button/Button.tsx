/**
 *
 * Button
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { Color } from '../styles/palette';
import { TypographySize } from '../styles/typography';

import * as styles from './Button.treat';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color; // default: `accent`
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  disabled?: boolean;
  size?: TypographySize; // default: `small`
  variant?: 'text' | 'link' | 'primary' | 'secondary'; // default: `secondary`
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      children,
      className,
      color = 'accent',
      component: Component = 'button' as React.ElementType<React.ComponentPropsWithRef<'button'>>,
      disabled,
      size = 'small',
      variant = 'secondary',
      ...rest
    } = props;

    const classes = useStyles(styles);

    return (
      <Component
        {...rest}
        ref={ref as any}
        className={clsx(
          classes.root,
          classes[variant],
          disabled && classes.disabled,
          classes.colors[color],
          classes.sizes[size],
          className,
        )}
        disabled={disabled}
        type="button"
      >
        <span className={clsx(classes.label)}>{children}</span>
      </Component>
    );
  },
);
