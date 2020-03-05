/**
 *
 * Radio
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { Color } from '../styles/palette';
import { TypographySize } from '../styles/typography';

import * as styles from './Readio.treat';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  color?: Color; // default: `accent`
  size?: TypographySize; // default: `small`
  disabled?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const { children, className, label, color = 'accent', size = 'small', disabled, ...rest } = props;

  const classes = useStyles(styles);

  return (
    <label
      className={clsx(
        classes.root,
        disabled && classes.disabled,
        classes.colors[color],
        classes.sizes[size],
        className,
      )}
    >
      <input {...rest} ref={ref} className={classes.input} disabled={disabled} type="radio" />

      <div className={classes.unchecked}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="circle"
          className="svg-inline--fa fa-circle fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
          ></path>
        </svg>
      </div>

      <div className={classes.checked}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="dot-circle"
          className="svg-inline--fa fa-dot-circle fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"
          ></path>
        </svg>
      </div>

      {label && <span className={classes.label}>{label}</span>}
    </label>
  );
});
