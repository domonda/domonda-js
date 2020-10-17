/**
 *
 * Input
 *
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import { Label } from '../Typography';
import { useStyles } from 'react-treat';
import * as classesRef from './Input.treat';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  dense?: boolean;
  naked?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const {
    className,
    label,
    naked,
    dense,
    disabled,
    startAdornment,
    endAdornment,
    onFocus,
    onBlur,
    onInvalid,
    onInput,
    ...rest
  } = props;
  const classes = useStyles(classesRef);
  const [focused, setFocused] = useState(false);
  const [invalid, setInvalid] = useState(false);

  return (
    <div className={clsx(classes.root, className)}>
      {label && (
        <Label
          color={invalid ? 'warning' : undefined}
          className={clsx(classes.label, dense && classes.dense)}
        >
          {label}
        </Label>
      )}
      <div
        className={clsx(
          classes.input.container,
          focused && classes.focused,
          invalid && classes.invalid,
          disabled && classes.disabled,
          naked && classes.naked,
          dense && classes.dense,
        )}
      >
        {startAdornment && <div className={classes.input.startAdornment}>{startAdornment}</div>}
        <input
          {...rest}
          ref={ref}
          disabled={disabled}
          onFocus={(event) => {
            setFocused(true);
            if (onFocus) onFocus(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            if (onBlur) onBlur(event);
          }}
          onInvalid={(event) => {
            setInvalid(true);
            if (onInvalid) onInvalid(event);
          }}
          onInput={(event) => {
            if (event.currentTarget.reportValidity()) setInvalid(false);
            if (onInput) onInput(event);
          }}
          className={clsx(classes.input.root, dense && classes.dense, disabled && classes.disabled)}
        />
        {endAdornment && <div className={classes.input.endAdornment}>{endAdornment}</div>}
      </div>
    </div>
  );
});
