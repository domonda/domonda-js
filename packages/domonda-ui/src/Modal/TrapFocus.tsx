/**
 *
 * TrapFocus
 *
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Modal/TrapFocus.js
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { useForkRef, ownerDocument } from '../utils';

export interface TrapFocusProps {
  /**
   * A single child content element.
   */
  children: React.DetailedReactHTMLElement<any, HTMLElement>;
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus?: boolean;
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus?: boolean;
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   */
  disableRestoreFocus?: boolean;
  /**
   * Return the document to consider.
   * We use it to implement the restore focus between different browser documents.
   */
  getDoc: () => Document;
  /**
   * Do we still want to enforce the focus?
   * This prop helps nesting TrapFocus elements.
   */
  isEnabled: () => boolean;
  /**
   * If `true`, the modal is open.
   */
  open: boolean;
}

export function TrapFocus(props: TrapFocusProps) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getDoc,
    isEnabled,
    open,
  } = props;
  const ignoreNextEnforceFocus = React.useRef<boolean | undefined>();
  const sentinelStart = React.useRef<HTMLDivElement | null>(null);
  const sentinelEnd = React.useRef<HTMLDivElement | null>(null);
  const nodeToRestore = React.useRef<HTMLElement | null>(null);
  const rootRef = React.useRef<HTMLElement | null>(null);
  // can be removed once we drop support for non ref forwarding class components
  const handleOwnRef = React.useCallback((instance) => {
    // #StrictMode ready
    // eslint-disable-next-line react/no-find-dom-node
    rootRef.current = ReactDOM.findDOMNode(instance) as HTMLElement | null;
  }, []);
  const handleRef = useForkRef(children.ref, handleOwnRef);

  // ⚠️ You may rely on React.useMemo as a performance optimization, not as a semantic guarantee.
  // https://reactjs.org/docs/hooks-reference.html#usememo
  React.useMemo(() => {
    if (!open || typeof window === 'undefined') {
      return;
    }

    nodeToRestore.current = getDoc().activeElement as HTMLElement | null;
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    // We might render an empty child.
    if (!disableAutoFocus && rootRef.current && !rootRef.current.contains(doc.activeElement)) {
      if (rootRef.current.hasAttribute('tabIndex')) {
        console.warn(
          [
            '@domonda/ui: the modal content node does not accept focus.',
            'For the benefit of assistive technologies, ' +
              'the tabIndex of the node is being set to "-1".',
          ].join('\n'),
        );
        rootRef.current.setAttribute('tabIndex', '-1');
      }

      rootRef.current.focus();
    }

    const contain = () => {
      if (disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (rootRef.current && !rootRef.current.contains(doc.activeElement)) {
        rootRef.current.focus();
      }
    };

    const loopFocus = (event: React.KeyboardEvent) => {
      // 9 = Tab
      if (disableEnforceFocus || !isEnabled() || event.keyCode !== 9) {
        return;
      }

      // Make sure the next tab starts from the right place.
      if (doc.activeElement === rootRef.current) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        if (event.shiftKey) {
          if (sentinelEnd.current) {
            sentinelEnd.current.focus();
          }
        } else {
          if (sentinelStart.current) {
            sentinelStart.current.focus();
          }
        }
      }
    };

    doc.addEventListener('focus', contain, true);
    doc.addEventListener('keydown', loopFocus as any, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      contain();
    }, 50);

    return () => {
      clearInterval(interval);

      doc.removeEventListener('focus', contain, true);
      doc.removeEventListener('keydown', loopFocus as any, true);

      // restoreLastFocus()
      if (!disableRestoreFocus) {
        // In IE 11 it is possible for document.activeElement to be null resulting
        // in nodeToRestore.current being null.
        // Not all elements in IE 11 have a focus method.
        // Once IE 11 support is dropped the focus() call can be unconditional.
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          nodeToRestore.current.focus();
        }

        nodeToRestore.current = null;
      }
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open]);

  return (
    <React.Fragment>
      <div tabIndex={0} ref={sentinelStart} />
      {React.cloneElement(children, { ref: handleRef })}
      <div tabIndex={0} ref={sentinelEnd} />
    </React.Fragment>
  );
}
