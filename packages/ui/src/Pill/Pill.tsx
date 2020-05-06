/**
 *
 * Pill
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles, Color, COLORS } from '../styles';

const styles = createStyles(({ palette, shape, spacing }) => ({
  root: {
    display: 'inline-flex',
    borderRadius: shape.borderRadius.pill,
    padding: `${spacing('tiny') / 2}px ${spacing('tiny')}px`,
  },
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        color: palette[color],
        backgroundColor: palette.lightest(color),
      },
    }),
    {},
  ),
}));

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  classes?: WithStyles<typeof styles>['classes'];
  color?: Color; // default: `secondary`
}

const Pill = React.forwardRef<HTMLSpanElement, PillProps & WithStyles<typeof styles>>(function Pill(
  props,
  ref,
) {
  const { children, classes, className, color = 'secondary', ...rest } = props;
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

if (process.env.NODE_ENV !== 'production') {
  Pill.displayName = 'Pill';
}

const StyledPill = withStyles(styles)(Pill);
export { StyledPill as Pill };
