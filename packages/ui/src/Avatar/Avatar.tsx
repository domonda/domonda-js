/**
 *
 * Avatar
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { Color } from '../styles/palette';
import { TypographySize } from '../styles/typography';

import * as styles from './Avatar.treat';

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
      className={clsx(classes.root, classes.colors[color], classes.sizes[size], className)}
    >
      <div className={clsx(classes.inner, classes.colors[color], classes.sizes[size])}>
        {children}
      </div>
    </div>
  );
});
