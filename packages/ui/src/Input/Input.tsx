/**
 *
 * Input
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { Label } from '../Label';

import * as styles from './Input.treat';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  dense?: boolean;
  naked?: boolean;
  startSvg?: React.ReactNode;
  endSvg?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { className, label, naked, dense, disabled, startSvg, endSvg, ...rest } = props;

  const classes = useStyles(styles);

  return (
    <div className={clsx(classes.root, className)}>
      <input
        {...rest}
        ref={ref}
        disabled={disabled}
        className={clsx(
          classes.input,
          naked && classes.naked,
          dense && classes.dense,
          disabled && classes.disabled,
          startSvg && classes.startSvg,
          endSvg && classes.endSvg,
        )}
      />

      {label && (
        <Label className={clsx(classes.label, dense && classes.dense, naked && classes.naked)}>
          {label}
        </Label>
      )}

      {startSvg && <span className={clsx(classes.svg, classes.startSvg)}>{startSvg}</span>}

      {endSvg && <span className={clsx(classes.svg, classes.endSvg)}>{endSvg}</span>}
    </div>
  );
});
