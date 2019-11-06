/**
 *
 * Avatar
 *
 */

import React from 'react';
import clsx from 'clsx';
import {
  createStyles,
  withStyles,
  WithStyles,
  TypographySize,
  TYPOGRAPHY_SIZES,
  Color,
  COLORS,
} from '../styles';

const styles = createStyles(({ typography, palette }) => ({
  root: {
    display: 'inline-flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    display: 'inline-flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      color: 'inherit',
      fill: 'currentColor',
    },
  },
  // {color}
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        backgroundColor: palette.lightest(color),
        '& > $inner': {
          backgroundColor: palette[color],
          color: palette.contrastText(color),
        },
      },
    }),
    {},
  ),
  // {size}
  ...TYPOGRAPHY_SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [size]: {
        width: `calc(${typography.sizes[size]}px * 4.4)`,
        height: `calc(${typography.sizes[size]}px * 4.4)`,
        '& > $inner': {
          width: `calc(${typography.sizes[size]}px * 3)`,
          height: `calc(${typography.sizes[size]}px * 3)`,
          fontSize: `calc(${typography.sizes[size]}px * 1.6)`,
          '& svg': {
            width: `calc(${typography.sizes[size]}px * 1.6)`,
          },
        },
      },
    }),
    {},
  ),
}));

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: WithStyles<typeof styles>['classes'];
  color?: Color; // default: `accent`
  size?: TypographySize; // default: `medium`
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps & WithStyles<typeof styles>>(
  function Avatar(props, ref) {
    const { children, classes, className, color = 'accent', size = 'small', ...rest } = props;
    return (
      <div
        {...rest}
        className={clsx(
          classes.root,
          classes[color as keyof typeof classes],
          classes[size as keyof typeof classes],
          className,
        )}
        ref={ref}
      >
        <div className={classes.inner}>{children}</div>
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Avatar.displayName = 'Avatar';
}

const StyledAvatar = withStyles(styles)(Avatar);
export { StyledAvatar as Avatar };
