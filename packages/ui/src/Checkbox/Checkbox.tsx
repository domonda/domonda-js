/**
 *
 * Checkbox
 *
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import { Color } from '../styles/palette';
import { Size } from '../styles/sizes';
import { Svg } from '../Svg';
import { useStyles } from 'react-treat';
import * as classesRef from './Checkbox.treat';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size; // default: `regular`
  color?: Color; // default: `accent`
  label?: React.ReactNode;
  wrap?: keyof typeof classesRef.wrap;
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
    size = 'regular',
    wrap = 'wrap',
    onFocus,
    onBlur,
    ...rest
  } = props;
  const classes = useStyles(classesRef);
  const [focused, setFocused] = useState(false);

  return (
    <label
      className={clsx(
        classes.root,
        checked && classes.checked,
        disabled && classes.disabled,
        focused && classes.focused,
        classes.colors[color],
        classes.sizes[size],
        classes.wrap[wrap],
        className,
      )}
    >
      <input
        {...rest}
        ref={ref}
        className={clsx(
          classes.input,
          disabled && classes.disabled,
          checked && classes.checked,
          checked !== undefined && classes.controlled, // when `checked` prop is not provided the input is uncontrolled,
          className,
        )}
        onFocus={(event) => {
          setFocused(true);
          if (onFocus) onFocus(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          if (onBlur) onBlur(event);
        }}
        checked={checked}
        disabled={disabled}
        type="checkbox"
      />

      <div className={clsx(classes.uncheckedIcon, classes.colors[color])}>
        <Svg
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
        </Svg>
      </div>
      <div className={clsx(classes.checkedIcon, classes.colors[color])}>
        <Svg
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
        </Svg>
      </div>

      {label && <span className={clsx(classes.label, classes.wrap[wrap])}>{label}</span>}
    </label>
  );
});
