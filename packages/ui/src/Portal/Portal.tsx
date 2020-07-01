/**
 *
 * Portal
 *
 * Implementation from:
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Portal/Portal.js
 *
 */

import React, { useLayoutEffect, useImperativeHandle, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children: React.ReactElement;
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered?: () => void;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
export const Portal = React.forwardRef<Element | null, PortalProps>(function Portal(props, ref) {
  const { children, onRendered } = props;

  const childRef = useRef<Element | null>(null);

  useImperativeHandle(ref, () => document.body || childRef.current!, [document.body]);

  useLayoutEffect(() => {
    if (onRendered) {
      onRendered();
    }
  }, [onRendered]);

  return ReactDOM.createPortal(children, document.body);
});

if (process.env.NODE_ENV !== 'production') {
  Portal.displayName = 'Portal';
}
