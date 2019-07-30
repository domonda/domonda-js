/**
 *
 * Divider
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles, Color } from '../styles';

const styles = createStyles(({ spacing }) => ({
  root: {
    margin: spacing(1, 0),
    borderStyle: 'solid',
    borderBottom: 0,
    opacity: 0.6,
  },
}));

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  color?: Color; // default: `textSecondary`
  weight?: 'thin' | 'bold'; // default: `thin`
}

const Divider: React.FC<DividerProps & WithStyles<typeof styles, true>> = (props) => {
  const {
    children,
    theme,
    classes,
    className,
    color = 'textSecondary',
    weight = 'thin',
    style,
    ...rest
  } = props;

  function deriveStyle() {
    return {
      borderColor: theme.palette[color],
      borderWidth: weight === 'thin' ? 1 : 2,
      ...style,
    };
  }

  return <hr {...rest} className={clsx(classes.root, className)} style={deriveStyle()} />;
};

const StyledDivider = withStyles(styles, { injectTheme: true })(Divider);
export { StyledDivider as Divider };
