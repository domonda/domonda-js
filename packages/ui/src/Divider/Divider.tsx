/**
 *
 * Divider
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles, Color } from '../styles';

const styles = createStyles(({ spacing }) => ({
  root: {
    margin: spacing('tiny', 'none'),
    borderStyle: 'solid',
    borderBottom: 0,
    opacity: 0.6,
  },
}));

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  color?: Color; // default: `border`
  weight?: 'thin' | 'bold'; // default: `thin`
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps & WithStyles<typeof styles, true>>(
  function Divider(props, ref) {
    const {
      children,
      theme,
      classes,
      className,
      color = 'border',
      weight = 'thin',
      style,
      ...rest
    } = props;

    const derivedStyle = useMemo(
      () => ({
        borderColor: theme.palette[color],
        borderWidth: weight === 'thin' ? 1 : 2,
        ...style,
      }),
      [theme, color, weight, style],
    );

    return (
      <hr {...rest} ref={ref} className={clsx(classes.root, className)} style={derivedStyle} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Divider.displayName = 'Divider';
}

const StyledDivider = withStyles(styles, { injectTheme: true })(Divider);
export { StyledDivider as Divider };
