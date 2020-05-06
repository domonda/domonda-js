/**
 *
 * Badge
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles, Color, COLORS } from '../styles';

const styles = createStyles(({ palette, spacing, shape, typography }) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing('tiny') - 2,
    borderRadius: shape.borderRadius.pill,
    backgroundColor: palette.accent,
    fontSize: typography.sizes.tiny,
    fontWeight: typography.weights.semiBold,
    lineHeight: '50%',
  },
  // {color}
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        backgroundColor: palette[color],
        color: palette.contrastText(color),
      },
    }),
    {},
  ),
}));

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  classes?: WithStyles<typeof styles>['classes'];
  color?: Color; // default: `accent`
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps & WithStyles<typeof styles>>(
  function Badge(props, ref) {
    const { children, classes, className, color = 'accent', ...rest } = props;

    return (
      <span
        {...rest}
        ref={ref}
        className={clsx(classes.root, classes[color as keyof typeof classes], className)}
      >
        {children}
      </span>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Badge.displayName = 'Badge';
}

const StyledBadge = withStyles(styles)(Badge);
export { StyledBadge as Badge };
