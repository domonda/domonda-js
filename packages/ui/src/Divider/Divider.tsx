/**
 *
 * Divider
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';

import { useStyles, useTheme } from 'treat';
import { Color } from '../styles/palette';

import * as styles from './Divider.treat';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  color?: Color; // default: `border`
  weight?: 'thin' | 'bold'; // default: `thin`
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(function Divider(props, ref) {
  const { children, className, color = 'border', style, weight = 'thin', ...rest } = props;

  const classes = useStyles(styles);
  const theme = useTheme();

  const derivedStyle = useMemo(
    () => ({
      borderColor: theme.palette[color],
      borderWidth: weight === 'thin' ? 1 : 2,
      ...style,
    }),
    [color, style, theme, weight],
  );

  return <hr ref={ref} className={clsx(classes.root, className)} style={derivedStyle} {...rest} />;
});
