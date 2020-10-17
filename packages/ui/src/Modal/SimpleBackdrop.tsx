/**
 *
 * SimpleBackdrop
 *
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Modal/SimpleBackdrop.js
 *
 */

import React from 'react';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    zIndex: -1,
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Remove grey highlight
    '--webkit-tap-highlight-color': 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none',
  },
  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent',
  },
};

export interface SimpleBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
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

/**
 * @ignore - internal component.
 */
export const SimpleBackdrop = React.forwardRef<HTMLDivElement, SimpleBackdropProps>(
  function SimpleBackdrop(props, ref) {
    const { invisible = false, open, ...other } = props;

    return open ? (
      <div
        aria-hidden
        ref={ref}
        {...other}
        style={{
          ...styles.root,
          ...(invisible ? styles.invisible : {}),
          ...(other.style as any),
        }}
      />
    ) : null;
  },
);

if (process.env.NODE_ENV !== 'production') {
  SimpleBackdrop.displayName = 'SimpleBackdrop';
}
