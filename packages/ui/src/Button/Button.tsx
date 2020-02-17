/**
 *
 * Button
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { COLOR_PREFIX, Color } from '../styles/palette';
import { TYPOGRAPHY_SIZE_PREFIX, TypographySize } from '../styles/typography';

import { styles } from './Button.treat';

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
          color && classes[(COLOR_PREFIX + color) as keyof typeof classes],
          classes[(TYPOGRAPHY_SIZE_PREFIX + size) as keyof typeof classes],
          classes[variant],
          disabled && classes.disabled,
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
