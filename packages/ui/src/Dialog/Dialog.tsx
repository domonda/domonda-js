/**
 *
 * Dialog
 *
 */

import React from 'react';
import clsx from 'clsx';
import { capitalize } from '../utils';
import { useStyles } from 'react-treat';
import { Backdrop } from '../Backdrop';
import { Modal, ModalProps } from '../Modal';
import { Paper, PaperProps } from '../Paper';

import * as styles from './Dialog.treat';

type ExtendingProps = Omit<ModalProps, 'children'>;

export interface DialogProps extends ExtendingProps {
  children?: React.ReactNode;
  maxWidth?: false;
  fullScreen?: boolean;
  fullWidth?: boolean;
  PaperComponent?: React.ComponentType<PaperProps>;
  PaperProps?: Partial<PaperProps>;
  scroll?: 'body' | 'paper';
}

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(function Dialog(props, ref) {
  const {
    BackdropProps,
    children,
    className,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onBackdropClick,
    onClose,
    onEscapeKeyDown,
    open,
    PaperComponent = Paper,
    PaperProps = {},
    scroll = 'paper',
    ...other
  } = props;
  const classes = useStyles(styles);

  const mouseDownTarget = React.useRef<any>();
  const handleMouseDown = (event: React.MouseEvent) => {
    mouseDownTarget.current = event.target;
  };
  const handleBackdropClick = (event: React.MouseEvent) => {
    // Ignore the events not coming from the "backdrop"
    // We don't want to close the dialog when clicking the dialog content.
    if (event.target !== event.currentTarget) {
      return;
    }

    // Make sure the event starts and ends on the same DOM element.
    if (event.target !== mouseDownTarget.current) {
      return;
    }

    mouseDownTarget.current = null;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  };

  return (
    <Modal
      className={clsx(classes.root, className)}
      BackdropComponent={Backdrop}
      BackdropProps={BackdropProps}
      closeAfterTransition
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
      onEscapeKeyDown={onEscapeKeyDown}
      onClose={onClose}
      open={open}
      ref={ref}
      {...other}
    >
      <div
        className={clsx(
          classes.container,
          classes[`scroll${capitalize(scroll)}` as keyof typeof classes],
        )}
        onClick={handleBackdropClick}
        onMouseDown={handleMouseDown}
      >
        <PaperComponent
          shadow="large"
          role="dialog"
          {...PaperProps}
          className={clsx(
            classes.paper,
            classes[`paperScroll${capitalize(scroll)}` as keyof typeof classes],
            classes[`paperWidth${capitalize(String(maxWidth))}` as keyof typeof classes],
            {
              [classes.paperFullScreen]: fullScreen,
              [classes.paperFullWidth]: fullWidth,
            },
            PaperProps.className,
          )}
        >
          {children}
        </PaperComponent>
      </div>
    </Modal>
  );
});
