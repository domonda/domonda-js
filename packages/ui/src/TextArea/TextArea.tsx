/**
 *
 * TextArea
 *
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import { Label } from '../Typography';
import { useStyles } from 'react-treat';
import * as classesRef from './TextArea.treat';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  dense?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  props,
  ref,
) {
  const { className, dense, disabled, label, onFocus, onBlur, onInvalid, onInput, ...rest } = props;
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
          classes.textArea.container,
          focused && classes.focused,
          invalid && classes.invalid,
          disabled && classes.disabled,
          dense && classes.dense,
        )}
      >
        <textarea
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
            if (event.currentTarget.checkValidity()) setInvalid(false);
            if (onInput) onInput(event);
          }}
          className={clsx(
            classes.textArea.root,
            dense && classes.dense,
            disabled && classes.disabled,
          )}
        />
      </div>
    </div>
  );
});
