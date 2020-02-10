/**
 *
 * Label
 *
 */

import React from 'react';
import clsx from 'clsx';
import { styles } from './Label.treat';
import { useStyles } from '../styles/treat';

export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  inline?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(props, ref) {
  const { children, className, inline, ...rest } = props;

  const classes = useStyles(styles);

  return (
    <label
      ref={ref}
      className={clsx(classes.root, inline ? classes.inline : classes.block, className)}
      {...rest}
    >
      {children}
    </label>
  );
});
