/**
 *
 * Pill
 *
 */

import React from 'react';
import clsx from 'clsx';
import { styles } from './Pill.treat';
import { useStyles } from '../styles/treat';
import { Color } from '../styles/palette';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Color; // default: `secondary`
}

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(function Pill(props, ref) {
  const { children, className, color = 'secondary', ...rest } = props;
  const classes = useStyles(styles);
  return (
    <span
      {...rest}
      className={clsx(classes.root, classes[color as keyof typeof classes], className)}
      ref={ref}
    >
      {children}
    </span>
  );
});
