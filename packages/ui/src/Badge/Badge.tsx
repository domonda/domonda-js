/**
 *
 * Badge
 *
 */

import React from 'react';
import clsx from 'clsx';
import { styles } from './Badge.treat';
import { useStyles } from '../styles/treat';
import { Color } from '../styles/palette';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: Color; // default: `accent`
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(props, ref) {
  const { children, className, color = 'accent', ...rest } = props;

  const classes = useStyles(styles);

  return (
    <span
      ref={ref}
      className={clsx(classes.root, classes[color as keyof typeof classes], className)}
      {...rest}
    >
      {children}
    </span>
  );
});
