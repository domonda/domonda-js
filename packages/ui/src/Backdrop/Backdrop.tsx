/**
 *
 * Backdrop
 *
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Backdrop/Backdrop.js
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { styles } from './Backdrop.treat';

// TODO-db-190902 extend FadeProps

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible?: boolean;
  /**
   * If `true`, the backdrop is open.
   */
  open: boolean;
}

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(function Backdrop(
  props,
  ref,
) {
  const { children, className, invisible = false, open, ...rest } = props;

  const classes = useStyles(styles);

  if (!open) {
    return null;
  }

  return (
    <div
      {...rest}
      ref={ref}
      aria-hidden
      className={clsx(
        classes.root,
        {
          [classes.invisible]: invisible,
        },
        className,
      )}
    >
      {children}
    </div>
  );
});
