/**
 *
 * Modal
 *
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Modal/Modal.js
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { useTheme, Theme } from '../styles/theme';
import { defaultZIndex as zIndex } from '../styles/zIndex';
import { ownerDocument, createChainedFunction, useForkRef, useEventCallback } from '../utils';
import { Portal, PortalProps } from '../Portal';
import { ModalManager, ariaHidden } from './ModalManager';
import { TrapFocus } from './TrapFocus';
import { SimpleBackdrop } from './SimpleBackdrop';
import { BackdropProps } from '../Backdrop';

function getContainer(container: any) {
  container = typeof container === 'function' ? container() : container;
  // eslint-disable-next-line react/no-find-dom-node
  return ReactDOM.findDOMNode(container);
}

function getHasTransition(props: any): boolean {
  // eslint-disable-next-line no-prototype-builtins
  return props.children ? props.children.props.hasOwnProperty('in') : false;
}

// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.
const defaultManager = new ModalManager();

export const styles = (theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {
    position: 'fixed',
    zIndex: theme.zIndex.modal,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  },
  /* Styles applied to the root element if the `Modal` has exited. */
  hidden: {
    visibility: 'hidden',
  },
});

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  BackdropComponent?: React.ElementType<BackdropProps>;
  BackdropProps?: Partial<BackdropProps>;
  children: React.ReactElement;
  closeAfterTransition?: boolean;
  container?: PortalProps['container'];
  disableAutoFocus?: boolean;
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: PortalProps['disablePortal'];
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  manager?: ModalManager;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  onRendered?: PortalProps['onRendered'];
  open: boolean;
}

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(props, ref) {
  const {
    BackdropComponent = SimpleBackdrop as any,
    BackdropProps,
    children,
    closeAfterTransition = false,
    container,
    disableAutoFocus = false,
    disableBackdropClick = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    manager = defaultManager,
    onBackdropClick,
    onClose,
    onEscapeKeyDown,
    onRendered,
    open,
    ...other
  } = props;

  const theme = useTheme();
  const [exited, setExited] = React.useState(true);
  const modal = React.useRef<any>({});
  const mountNodeRef = React.useRef<any>(null);
  const modalRef = React.useRef<any>(null);
  const handleRef = useForkRef(modalRef, ref);
  const hasTransition = getHasTransition(props);

  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };

  const handleMounted = () => {
    manager.mount(getModal(), { disableScrollLock });

    // Fix a bug on Chrome where the scroll isn't initially 0.
    modalRef.current.scrollTop = 0;
  };

  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;

    manager.add(getModal(), resolvedContainer);

    // The element was already mounted.
    if (modalRef.current) {
      handleMounted();
    }
  });

  const isTopModal = React.useCallback(() => manager.isTopModal(getModal()), [manager]);

  const handlePortalRef = useEventCallback((node: HTMLElement | null) => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    if (onRendered) {
      onRendered();
    }

    if (open && isTopModal()) {
      handleMounted();
    } else {
      ariaHidden(modalRef.current, true);
    }
  });

  const handleClose = React.useCallback(() => {
    manager.remove(getModal());
  }, [manager]);

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  const handleEnter = () => {
    setExited(false);
  };

  const handleExited = () => {
    setExited(true);

    if (closeAfterTransition) {
      handleClose();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    // We don't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (event.key !== 'Escape' || !isTopModal()) {
      return;
    }

    // Swallow the event, in case someone is listening for the escape key on the body.
    event.stopPropagation();

    if (onEscapeKeyDown) {
      onEscapeKeyDown(event);
    }

    if (!disableEscapeKeyDown && onClose) {
      onClose(event, 'escapeKeyDown');
    }
  };

  const inlineStyle = styles(theme || { zIndex });
  const childProps: { [key: string]: any } = {};
  // FixMe: Always apply document role. Revisit once React Flare is released
  if ((children as any).role === undefined) {
    childProps.role = (children as any).role || 'document';
  }
  if ((children as any).tabIndex === undefined) {
    childProps.tabIndex = (children as any).tabIndex || '-1';
  }

  // It's a Transition like component
  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
    childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
  }

  return (
    /*
      Marking an element with the role presentation indicates to assistive technology
      that this element should be ignored; it exists to support the web application and
      is not meant for humans to interact with directly.
      https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    */
    <Portal ref={handlePortalRef} container={container} disablePortal={disablePortal}>
      <div
        ref={handleRef}
        onKeyDown={handleKeyDown}
        role="presentation"
        {...other}
        style={{
          ...inlineStyle.root,
          ...(!open && exited ? inlineStyle.hidden : {}),
          ...(other.style as any),
        }}
      >
        {hideBackdrop ? null : (
          <BackdropComponent open={open} onClick={handleBackdropClick} {...BackdropProps} />
        )}
        <TrapFocus
          disableEnforceFocus={disableEnforceFocus}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          getDoc={getDoc}
          isEnabled={isTopModal}
          open={open}
        >
          {React.cloneElement(children, childProps) as any}
        </TrapFocus>
      </div>
    </Portal>
  );
});
