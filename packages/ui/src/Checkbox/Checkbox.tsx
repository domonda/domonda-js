/**
 *
 * Checkbox
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from 'react-treat';
import { Color } from '../styles/palette';
import { Size } from '../styles/sizes';

import * as styles from './Checkbox.treat';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  color?: Color; // default: `accent`
  label?: React.ReactNode;
  size?: Size; // default: `small`
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  props,
  ref,
) {
  const {
    children,
    className,
    label,
    checked,
    color = 'accent',
    disabled,
    size = 'small',
    ...rest
  } = props;

  const classes = useStyles(styles);

  return (
    <label
      className={clsx(
        classes.root,
        checked && classes.checked,
        disabled && classes.disabled,
        classes.colors[color],
        classes.sizes[size],
        className,
      )}
    >
      <input
        {...rest}
        ref={ref}
        className={clsx(
          classes.input,
          checked && classes.checked,
          checked !== undefined && classes.controlled, // when `checked` prop is not provided the input is uncontrolled,
          className,
        )}
        checked={checked}
        disabled={disabled}
        type="checkbox"
      />

      <div className={classes.uncheckedIcon}>
        <svg
          aria-hidden="true"
          className="svg-inline--fa fa-circle fa-w-16"
          data-icon="circle"
          data-prefix="far"
          focusable="false"
          role="img"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className={classes.checkedIcon}>
        <svg
          aria-hidden="true"
          className="svg-inline--fa fa-check-circle fa-w-16"
          data-icon="check-circle"
          data-prefix="fas"
          focusable="false"
          role="img"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {label && <span className={classes.label}>{label}</span>}
    </label>
  );
});
