/**
 *
 * Portal
 *
 * Implementation from:
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Portal/Portal.js
 *
 */

import React, { useLayoutEffect, useImperativeHandle, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useForkRef } from '../hooks';

function getContainer(container: PortalContainer): Element | null {
  container = typeof container === 'function' ? container() : container;
  // #StrictMode ready
  // eslint-disable-next-line react/no-find-dom-node
  return ReactDOM.findDOMNode(container) as Element | null;
}

export type PortalContainer = Element | (() => Element);

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children: React.ReactElement;
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalContainer;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
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
  const { children, container, disablePortal = false, onRendered } = props;

  const [mountNode, setMountNode] = useState<Element | null>(null);
  const childRef = useRef<Element | null>(null);

  // as any because .ref does indeed exist
  const handleRef = useForkRef((children as any).ref, childRef);

  useLayoutEffect(() => {
    if (!disablePortal) {
      setMountNode(container ? getContainer(container) : document.body);
    }
  }, [container, disablePortal]);

  useImperativeHandle(ref, () => mountNode || childRef.current, [mountNode]);

  useLayoutEffect(() => {
    if (onRendered && mountNode) {
      onRendered();
    }
  }, [mountNode, onRendered]);

  if (disablePortal) {
    React.Children.only(children);
    return React.cloneElement(children, {
      ref: handleRef,
    });
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});

if (process.env.NODE_ENV !== 'production') {
  Portal.displayName = 'Portal';
}
