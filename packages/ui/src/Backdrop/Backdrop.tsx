/**
 *
 * Backdrop
 *
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Backdrop/Backdrop.js
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles({
  /* Styles applied to the root element. */
  root: {
    zIndex: -1,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none',
  },
  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent',
  },
});

// TODO-db-190902 extend FadeProps

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
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

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps & WithStyles<typeof styles>>(
  function Backdrop(props, ref) {
    const { children, classes, className, invisible = false, open } = props;

    if (!open) {
      return null;
    }

    return (
      <div
        className={clsx(
          classes.root,
          {
            [classes.invisible]: invisible,
          },
          className,
        )}
        aria-hidden
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Backdrop.displayName = 'Backdrop';
}

const StyledBackdrop = withStyles(styles)(Backdrop);
export { StyledBackdrop as Backdrop };
