/**
 *
 * Popover
 *
 * https://github.com/mui-org/material-ui/blob/b18a78e8cdad5894e96e65d6451545e075ed9d15/packages/material-ui/src/Popover/Popover.js
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { ownerDocument, ownerWindow, createChainedFunction, debounce } from '../utils';
import { withStyles, WithStyles, createStyles, TransitionHandlerProps } from '../styles';
import { Modal, ModalProps } from '../Modal';
import { Grow } from '../Grow';
import { Paper, PaperProps } from '../Paper';
import { TransitionProps, EnterHandler } from 'react-transition-group/Transition';

function getOffsetTop(rect: any, vertical: any) {
  let offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

function getOffsetLeft(rect: any, horizontal: any) {
  let offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin: any) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === 'number' ? `${n}px` : n))
    .join(' ');
}

// Sum the scrollTop between two elements.
function getScrollParent(parent: Element, child: Element) {
  let element = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentNode as Element;
    scrollTop += element.scrollTop;
  }
  return scrollTop;
}

function getAnchorEl(anchorEl: any) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const styles = createStyles({
  /* Styles applied to the `Paper` component. */
  paper: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  },
});

export interface PopoverOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

export interface PopoverPosition {
  top: number;
  left: number;
}

export type PopoverReference = 'anchorEl' | 'anchorPosition' | 'none';

export interface PopoverActions {
  updatePosition(): void;
}

type ExtendingProps = Omit<ModalProps, 'children'> & Partial<TransitionHandlerProps>;

export interface PopoverProps extends ExtendingProps {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  action?: React.Ref<PopoverActions | null>;
  anchorEl?: null | Element | ((element: Element) => Element);
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  anchorReference?: PopoverReference;
  children?: React.ReactNode;
  elevation?: number;
  getContentAnchorEl?: null | ((element: Element) => Element);
  marginThreshold?: number;
  modal?: boolean;
  PaperProps?: Partial<PaperProps>;
  role?: string;
  transformOrigin?: PopoverOrigin;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  TransitionProps?: TransitionProps;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps & WithStyles<typeof styles>>(
  function Popover(props, ref) {
    const {
      action,
      anchorEl,
      anchorOrigin = {
        vertical: 'top',
        horizontal: 'left',
      },
      anchorPosition,
      anchorReference = 'anchorEl',
      children,
      classes,
      container: containerProp,
      elevation = 8,
      getContentAnchorEl,
      marginThreshold = 16,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      open,
      PaperProps = {},
      transformOrigin = {
        vertical: 'top',
        horizontal: 'left',
      },
      TransitionComponent = Grow,
      transitionDuration: transitionDurationProp = 'auto',
      TransitionProps = {} as TransitionProps,
      ...other
    } = props;
    const paperRef = React.useRef<any>();

    // Returns the top/left offset of the position
    // to attach to on the anchor element (or body if none is provided)
    const getAnchorOffset = React.useCallback(
      (contentAnchorOffset) => {
        if (anchorReference === 'anchorPosition') {
          if (!anchorPosition) {
            // eslint-disable-next-line no-console
            console.warn(
              '@domonda/ui: you need to provide a `anchorPosition` prop when using ' +
                '<Popover anchorReference="anchorPosition" />.',
            );
          }
          return anchorPosition;
        }

        const resolvedAnchorEl = getAnchorEl(anchorEl);
        const containerWindow = ownerWindow(resolvedAnchorEl);

        // If an anchor element wasn't provided, just use the parent body element of this Popover
        const anchorElement =
          resolvedAnchorEl instanceof (containerWindow as any).Element
            ? resolvedAnchorEl
            : ownerDocument(paperRef.current).body;
        const anchorRect = anchorElement.getBoundingClientRect();
        const anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

        return {
          top: anchorRect.top + getOffsetTop(anchorRect, anchorVertical),
          left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
        };
      },
      [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference],
    );

    // Returns the vertical offset of inner content to anchor the transform on if provided
    const getContentAnchorOffset = React.useCallback(
      (element) => {
        let contentAnchorOffset = 0;

        if (getContentAnchorEl && anchorReference === 'anchorEl') {
          const contentAnchorEl: any = getContentAnchorEl(element);

          if (contentAnchorEl && element.contains(contentAnchorEl)) {
            const scrollTop = getScrollParent(element, contentAnchorEl);
            contentAnchorOffset =
              contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
          }

          // != the default value
          if (anchorOrigin.vertical !== 'top') {
            // eslint-disable-next-line no-console
            console.warn(
              [
                '@domonda/ui: you can not change the default `anchorOrigin.vertical` value ',
                'when also providing the `getContentAnchorEl` prop to the popover component.',
                'Only use one of the two props.',
                'Set `getContentAnchorEl` to `null | undefined`' +
                  ' or leave `anchorOrigin.vertical` unchanged.',
              ].join('\n'),
            );
          }
        }

        return contentAnchorOffset;
      },
      [anchorOrigin.vertical, anchorReference, getContentAnchorEl],
    );

    // Return the base transform origin using the element
    // and taking the content anchor offset into account if in use
    const getTransformOrigin = React.useCallback(
      (elemRect, contentAnchorOffset = 0) => {
        return {
          vertical: getOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
          horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
        };
      },
      [transformOrigin.horizontal, transformOrigin.vertical],
    );

    const getPositioningStyle = React.useCallback(
      (element) => {
        // Check if the parent has requested anchoring on an inner content node
        const contentAnchorOffset = getContentAnchorOffset(element);
        const elemRect = {
          width: element.offsetWidth,
          height: element.offsetHeight,
        };

        // Get the transform origin point on the element itself
        const elemTransformOrigin = getTransformOrigin(elemRect, contentAnchorOffset);

        if (anchorReference === 'none') {
          return {
            top: null,
            left: null,
            transformOrigin: getTransformOriginValue(elemTransformOrigin),
          };
        }

        // Get the offset of of the anchoring element
        const anchorOffset: any = getAnchorOffset(contentAnchorOffset);

        // Calculate element positioning
        let top = anchorOffset.top - elemTransformOrigin.vertical;
        let left = anchorOffset.left - elemTransformOrigin.horizontal;
        const bottom = top + elemRect.height;
        const right = left + elemRect.width;

        // Use the parent window of the anchorEl if provided
        const containerWindow = ownerWindow(getAnchorEl(anchorEl));

        // Window thresholds taking required margin into account
        const heightThreshold = containerWindow.innerHeight - marginThreshold;
        const widthThreshold = containerWindow.innerWidth - marginThreshold;

        // Check if the vertical axis needs shifting
        if (top < marginThreshold) {
          const diff = top - marginThreshold;
          top -= diff;
          elemTransformOrigin.vertical += diff;
        } else if (bottom > heightThreshold) {
          const diff = bottom - heightThreshold;
          top -= diff;
          elemTransformOrigin.vertical += diff;
        }

        if (!(elemRect.height <= heightThreshold || !elemRect.height || !heightThreshold)) {
          // eslint-disable-next-line no-console
          console.warn(
            [
              '@domonda/ui: the popover component is too tall.',
              `Some part of it can not be seen on the screen (${elemRect.height -
                heightThreshold}px).`,
              'Please consider adding a `max-height` to improve the user-experience.',
            ].join('\n'),
          );
        }

        // Check if the horizontal axis needs shifting
        if (left < marginThreshold) {
          const diff = left - marginThreshold;
          left -= diff;
          elemTransformOrigin.horizontal += diff;
        } else if (right > widthThreshold) {
          const diff = right - widthThreshold;
          left -= diff;
          elemTransformOrigin.horizontal += diff;
        }

        return {
          top: `${top}px`,
          left: `${left}px`,
          transformOrigin: getTransformOriginValue(elemTransformOrigin),
        };
      },
      [
        anchorEl,
        anchorReference,
        getAnchorOffset,
        getContentAnchorOffset,
        getTransformOrigin,
        marginThreshold,
      ],
    );

    const setPositioningStyles = React.useCallback(
      (element) => {
        const positioning = getPositioningStyle(element);

        if (positioning.top !== null) {
          element.style.top = positioning.top;
        }
        if (positioning.left !== null) {
          element.style.left = positioning.left;
        }
        element.style.transformOrigin = positioning.transformOrigin;
      },
      [getPositioningStyle],
    );

    const handleEntering: EnterHandler = (element, isAppearing) => {
      if (onEntering) {
        onEntering(element, isAppearing);
      }

      setPositioningStyles(element);
    };

    const handlePaperRef = React.useCallback((instance) => {
      // #StrictMode ready
      // eslint-disable-next-line react/no-find-dom-node
      paperRef.current = ReactDOM.findDOMNode(instance);
    }, []);

    const updatePosition = React.useMemo(() => {
      if (!open) {
        return undefined;
      }

      return debounce(() => {
        setPositioningStyles(paperRef.current);
      });
    }, [open, setPositioningStyles]);

    React.useImperativeHandle(action, () => (open ? ({ updatePosition } as any) : null), [
      open,
      updatePosition,
    ]);

    React.useEffect(() => {
      if (!updatePosition) {
        return undefined;
      }

      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
        (updatePosition as any).clear();
      };
    }, [updatePosition]);

    // If the container prop is provided, use that
    // If the anchorEl prop is provided, use its parent body element as the container
    // If neither are provided let the Modal take care of choosing the container
    const container =
      containerProp || (anchorEl ? ownerDocument(getAnchorEl(anchorEl)).body : undefined);

    return (
      <Modal
        container={container}
        open={open}
        ref={ref}
        BackdropProps={{ invisible: true }}
        {...(other as any)}
      >
        <TransitionComponent
          appear
          in={open}
          onEnter={onEnter}
          onEntered={onEntered}
          onExit={onExit}
          onExited={onExited}
          onExiting={onExiting}
          timeout={transitionDurationProp}
          {...(TransitionProps as any)}
          onEntering={createChainedFunction(handleEntering, TransitionProps.onEntering)}
        >
          <Paper
            elevation={elevation}
            ref={handlePaperRef}
            {...PaperProps}
            className={clsx(classes.paper, PaperProps.className)}
          >
            {children}
          </Paper>
        </TransitionComponent>
      </Modal>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}

const StyledPopover = withStyles(styles)(Popover);
export { StyledPopover as Popover };
