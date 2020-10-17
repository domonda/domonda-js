/**
 *
 * Pill
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from 'react-treat';
import { Color } from '../styles/palette';

import * as styles from './Pill.treat';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Color; // default: `secondary`
}

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(function Pill(props, ref) {
  const { children, className, color = 'secondary', ...rest } = props;

  const classes = useStyles(styles);

  return (
    <span {...rest} ref={ref} className={clsx(classes.root, classes.colors[color], className)}>
      {children}
    </span>
  );
});
