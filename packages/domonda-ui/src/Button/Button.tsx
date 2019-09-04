/**
 *
 * Button
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Color, generateStaticClassName } from '../styles';

// decorate
import { decorate, Decorate, SIZES } from './decorate';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: Decorate['classes'];
  color?: Color; // default: `default`
  variant?: 'text' | 'contained' | 'outlined'; // default: `text`
  size?: typeof SIZES[0]; // default: `md`
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

export const buttonClassName = generateStaticClassName('Button');
export const buttonLabelClassName = generateStaticClassName('Button--label');

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & Decorate>(
  function Button(props, ref) {
    const {
      children,
      classes,
      color = 'default',
      variant = 'text',
      className,
      size = 'md',
      disabled,
      component: Component = 'button' as React.ElementType<React.ComponentPropsWithRef<'button'>>,
      ...rest
    } = props;

    return (
      <Component
        type="button"
        {...rest}
        ref={ref as any}
        disabled={disabled}
        className={clsx(
          buttonClassName,
          classes.root,
          classes[`size-${size}` as keyof typeof classes],
          {
            [classes[`text-${color}` as keyof typeof classes]]: variant === 'text',
            [classes[`contained-${color}` as keyof typeof classes]]: variant === 'contained',
            [classes[`outlined-${color}` as keyof typeof classes]]: variant === 'outlined',
            [classes.disabled]: disabled,
          },
          className,
        )}
      >
        <span className={clsx(buttonLabelClassName, classes.label)}>{children}</span>
      </Component>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

const StyledButton = decorate(Button);
export { StyledButton as Button };
