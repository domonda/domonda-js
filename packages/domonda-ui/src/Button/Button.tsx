/**
 *
 * Button
 *
 */

import * as React from 'react';
import clsx from 'clsx';
import { Color, generateStaticClassName, ColorVariant } from '../styles';

// decorate
import { decorate, Decorate } from './decorate';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  colorVariant?: ColorVariant;
  variant?: 'text' | 'contained' | 'outlined'; // default: `text`
  size?: 'sm' | 'md';
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

export const buttonClassName = generateStaticClassName('Button');
export const buttonLabelClassName = generateStaticClassName('Button--label');

const Button: React.FC<ButtonProps & Decorate> = (props) => {
  const {
    children,
    classes,
    color,
    colorVariant,
    variant = 'text',
    className,
    size,
    disabled,
    component: Component = 'button' as React.ElementType<React.ComponentPropsWithRef<'button'>>,
    ...rest
  } = props;

  return (
    <Component
      type="button"
      {...rest}
      disabled={disabled}
      className={clsx(
        buttonClassName,
        classes.root,
        classes.size,
        {
          [classes.text]: variant === 'text',
          [classes.contained]: variant === 'contained',
          [classes.outlined]: variant === 'outlined',
          [classes.disabled]: disabled,
        },
        className,
      )}
    >
      <span className={clsx(buttonLabelClassName, classes.label)}>{children}</span>
    </Component>
  );
};

const StyledButton = decorate(Button);
export { StyledButton as Button };
