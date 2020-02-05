/**
 *
 * Input
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Label } from '../Label';
import { styles } from './Input.treat';
import { useStyles } from '../styles/treat';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  dense?: boolean;
  naked?: boolean;
  startSvg?: React.ReactNode;
  endSvg?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { className, label, dense, naked, disabled, startSvg, endSvg, ...rest } = props;
  const classes = useStyles(styles);
  return (
    <div className={clsx(classes.root, className)}>
      <input
        {...rest}
        ref={ref}
        disabled={disabled}
        className={clsx(
          classes.input,
          dense && classes.dense,
          naked && classes.naked,
          startSvg && classes.startSvg,
          endSvg && classes.endSvg,
          disabled && classes.disabled,
        )}
      />
      {label && (
        <Label className={clsx(classes.label, dense && classes.dense, naked && classes.naked)}>
          {label}
        </Label>
      )}
      {startSvg && <span className={classes.startSvg}>{startSvg}</span>}
      {endSvg && <span className={classes.endSvg}>{endSvg}</span>}
    </div>
  );
});
