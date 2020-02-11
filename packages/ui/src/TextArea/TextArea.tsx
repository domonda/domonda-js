/**
 *
 * TextArea
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';

import { Label } from '../Label';

import { styles } from './TextArea.treat';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  dense?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  props,
  ref,
) {
  const { className, dense, disabled, label, ...rest } = props;

  const classes = useStyles(styles);

  return (
    <div className={clsx(classes.root, className)}>
      <textarea
        {...rest}
        ref={ref}
        disabled={disabled}
        className={clsx(classes.textArea, dense && classes.dense, disabled && classes.disabled)}
      />
      {label && <Label className={clsx(classes.label, dense && classes.dense)}>{label}</Label>}
    </div>
  );
});
