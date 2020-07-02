/**
 *
 * Badge
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Typography, TypographyProps } from '../Typography';
import { Color } from '../styles/palette';
import { useStyles } from 'react-treat';
import * as classesRef from './Badge.treat';

export interface BadgeProps extends TypographyProps {
  color?: Color; // default: `accent`
}

export const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(props, ref) {
  const { children, className, color = 'accent', ...rest } = props;
  const classes = useStyles(classesRef);

  return (
    <Typography
      {...rest}
      variant="small"
      ref={ref}
      className={clsx(classes.root, classes.colors[color], className)}
    >
      {children}
    </Typography>
  );
});
