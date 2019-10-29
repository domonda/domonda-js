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
    margin: spacing('small', 'none'),
    borderStyle: 'solid',
    borderBottom: 0,
    opacity: 0.6,
  },
}));

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  color?: Color; // default: `textSecondary`
  weight?: 'thin' | 'bold'; // default: `thin`
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps & WithStyles<typeof styles, true>>(
  function Divider(props, ref) {
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

    return (
      <hr {...rest} ref={ref} className={clsx(classes.root, className)} style={deriveStyle()} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Divider.displayName = 'Divider';
}

const StyledDivider = withStyles(styles, { injectTheme: true })(Divider);
export { StyledDivider as Divider };
