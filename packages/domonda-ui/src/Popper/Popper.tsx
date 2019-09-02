/**
 *
 * Popper
 *
 * Implementation from:
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Popper/Popper.js
 *
 */

import React, {
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Portal, PortalProps } from '../Portal';
import PopperJS, { PopperOptions, ReferenceObject } from 'popper.js';
import { useForkRef } from '../hooks';
import { createChainedFunction } from '../utils';

function flipPlacement(placement: PopperPlacement) {
  const direction = (typeof window !== 'undefined' && document.body.getAttribute('dir')) || 'ltr';

  if (direction !== 'rtl') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

function getAnchorEl(
  anchorEl: Element | ReferenceObject | (() => Element | ReferenceObject) | null,
) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

export type PopperPlacement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  anchorEl?: null | Element | ReferenceObject | (() => Element | ReferenceObject);
  children: React.ReactNode;
  container?: PortalProps['container'];
  disablePortal?: PortalProps['disablePortal'];
  keepMounted?: boolean;
  modifiers?: object;
  open: boolean;
  placement?: PopperPlacement;
  popperOptions?: PopperOptions;
  popperRef?: React.Ref<PopperJS>;
}

/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
export const Popper = React.forwardRef<Element | null, PopperProps>(function Popper(props, ref) {
  const {
    anchorEl,
    children,
    container,
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement: placementProps = 'bottom',
    popperOptions = {},
    popperRef: popperRefProp,
    ...other
  } = props;
  const tooltipRef = useRef(null);
  const handleRef = useForkRef<Element | null>(tooltipRef, ref);

  const popperRef = useRef<PopperJS | null>(null);
  const handlePopperRefRef = useRef<((refValue: PopperJS) => void) | null>(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);

  useLayoutEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  useImperativeHandle(popperRefProp, () => popperRef.current!, []);

  const [placement, setPlacement] = useState();

  const handleOpen = useCallback(() => {
    const handlePopperUpdate = (data: PopperJS.Data) => {
      if (data.placement !== placement) {
        setPlacement(data.placement);
      }
    };

    const popperNode = tooltipRef.current;

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      handlePopperRefRef.current!(null as any);
    }

    const popper = new PopperJS(getAnchorEl(anchorEl)!, popperNode, {
      placement: flipPlacement(placementProps),
      ...popperOptions,
      modifiers: {
        ...(disablePortal
          ? {}
          : {
              // It's using scrollParent by default, we can use the viewport when using a portal.
              preventOverflow: {
                boundariesElement: 'window',
              },
            }),
        ...modifiers,
        ...popperOptions.modifiers,
      },
      // We could have been using a custom modifier like react-popper is doing.
      // But it seems this is the best public API for this use case.
      onCreate: createChainedFunction(handlePopperUpdate, popperOptions.onCreate),
      onUpdate: createChainedFunction(handlePopperUpdate, popperOptions.onUpdate),
    });
    handlePopperRefRef.current!(popper);
  }, [anchorEl, disablePortal, modifiers, open, placement, placementProps, popperOptions]);

  const handleClose = () => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current!(null as any);
  };

  useEffect(() => {
    // Let's update the popper position.
    handleOpen();
  }, [handleOpen]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open]);

  if (!keepMounted && !open) {
    return null;
  }

  return (
    <Portal onRendered={handleOpen} disablePortal={disablePortal} container={container}>
      <div
        ref={handleRef}
        role="tooltip"
        style={{
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: 'absolute',
          zIndex: 1,
        }}
        {...other}
      >
        {children}
      </div>
    </Portal>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Popper.displayName = 'Popper';
}
