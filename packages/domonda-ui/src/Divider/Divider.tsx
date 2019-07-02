/**
 *
 * Divider
 *
 */

import React from 'react';
import clsx from 'clsx';
import { makeCreateStyles, withStyles, WithStyles, Color } from '../styles';

const styles = makeCreateStyles<DividerProps>()(({ palette, spacing }) => ({
  root: {
    margin: spacing(1, 0),
    borderStyle: 'solid',
    borderBottom: 0,
    opacity: 0.6,
  },
  color: ({ color = 'textSecondary' }) => ({
    borderColor: palette[color],
  }),
  weight: ({ weight = 'thin' }) => ({
    borderWidth: weight === 'thin' ? 1 : 2,
  }),
}));

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  color?: Color; // default: `textSecondary`
  weight?: 'thin' | 'bold'; // default: `thin`
}

const Divider: React.FC<DividerProps & WithStyles<typeof styles>> = (props) => {
  const { children, classes, className, color, weight, ...rest } = props;
  return <hr {...rest} className={clsx(classes.root, classes.color, classes.weight, className)} />;
};

const StyledDivider = withStyles(styles)(Divider);
export { StyledDivider as Divider };
