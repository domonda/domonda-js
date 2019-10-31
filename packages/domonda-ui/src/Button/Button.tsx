/**
 *
 * Button
 *
 */

import React from 'react';
import clsx from 'clsx';
import { generateStaticClassName } from '../styles/generateStaticClassName';
import { Color } from '../styles/palette';
import { TypographySize } from '../styles/typography';

// decorate
import { decorate, Decorate } from './decorate';

export const buttonClassName = generateStaticClassName('Button');

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: Partial<Decorate['classes']>;
  color?: Color;
  variant?: 'text' | 'link' | 'primary' | 'secondary'; // default: `secondary`
  size?: TypographySize; // default: `small`
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & Decorate>(
  function Button(props, ref) {
    const {
      children,
      classes,
      color,
      variant = 'secondary',
      className,
      size = 'small',
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
          classes[variant],
          disabled && classes.disabled,
          color && classes[`color-${color}` as keyof typeof classes],
          className,
        )}
      >
        <span className={clsx(classes.label)}>{children}</span>
      </Component>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

const StyledButton = decorate(Button);
export { StyledButton as Button };
