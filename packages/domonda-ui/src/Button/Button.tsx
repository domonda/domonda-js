/**
 *
 * Button
 *
 */

import * as React from 'react';
import clsx from 'clsx';
import { Color, generateStaticClassName } from '../styles';

// decorate
import { decorate, Decorate, SIZES } from './decorate';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color; // default: `default`
  variant?: 'text' | 'contained' | 'outlined'; // default: `text`
  size?: typeof SIZES[0]; // default: `md`
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

export const buttonClassName = generateStaticClassName('Button');
export const buttonLabelClassName = generateStaticClassName('Button--label');

const Button: React.FC<ButtonProps & Decorate> = (props) => {
  const {
    children,
    classes,
    color = 'default',
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
        size && classes[`size-${size}` as keyof typeof classes],
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
};

const StyledButton = decorate(Button);
export { StyledButton as Button };
