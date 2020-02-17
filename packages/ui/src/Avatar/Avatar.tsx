/**
 *
 * Avatar
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { COLOR_PREFIX, Color } from '../styles/palette';
import { TYPOGRAPHY_SIZE_PREFIX, TypographySize } from '../styles/typography';

import { styles } from './Avatar.treat';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color; // default: `accent`
  size?: TypographySize; // default: `medium`
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(props, ref) {
  const { children, className, color = 'accent', size = 'small', ...rest } = props;

  const classes = useStyles(styles);

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(
        classes.root,
        classes[(COLOR_PREFIX + color) as keyof typeof classes],
        classes[(TYPOGRAPHY_SIZE_PREFIX + size) as keyof typeof classes],
        className,
      )}
    >
      <div className={classes.inner}>{children}</div>
    </div>
  );
});
