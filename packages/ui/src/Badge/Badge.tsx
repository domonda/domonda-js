/**
 *
 * Badge
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from 'react-treat';
import { Color } from '../styles/palette';

import * as styles from './Badge.treat';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Color; // default: `accent`
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(props, ref) {
  const { children, className, color = 'accent', ...rest } = props;

  const classes = useStyles(styles);

  return (
    <span {...rest} ref={ref} className={clsx(classes.root, classes.colors[color], className)}>
      {children}
    </span>
  );
});
