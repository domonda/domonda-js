/**
 *
 * Dialog
 *
 */

import React from 'react';
import clsx from 'clsx';
import { TransitionProps } from 'react-transition-group/Transition';

import { useStyles } from '../styles/treat';
import { defaultDuration, TransitionHandlerProps } from '../styles/transition';
import { capitalize } from '../utils';

import { Backdrop } from '../Backdrop';
<<<<<<< HEAD
=======
import { Fade } from '../Fade';
import { Modal, ModalProps } from '../Modal';
>>>>>>> refactor(Dialog): use treat
import { Paper, PaperProps } from '../Paper';

import { styles } from './Dialog.treat';

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
<<<<<<< HEAD
const Dialog = React.forwardRef<HTMLDivElement, DialogProps & WithStyles<typeof styles>>(
  function Dialog(props, ref) {
    const {
      BackdropProps,
      children,
      classes,
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
=======
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(function Dialog(props, ref) {
  const {
    children,
    className,
    BackdropProps,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    open,
    PaperComponent = Paper,
    PaperProps = {},
    scroll = 'paper',
    TransitionComponent = Fade,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    onBackdropClick,
    onClose,
    onEnter,
    onEntered,
    onEntering,
    onEscapeKeyDown,
    onExit,
    onExited,
    onExiting,
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
      ref={ref}
      BackdropComponent={Backdrop}
      BackdropProps={{
        transitionDuration,
        ...BackdropProps,
      }}
      className={clsx(classes.root, className)}
      closeAfterTransition
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
      open={open}
      onClose={onClose}
      onEscapeKeyDown={onEscapeKeyDown}
      {...other}
    >
      <TransitionComponent
        appear
        in={open}
        role="none presentation"
        timeout={transitionDuration}
        onEnter={onEnter}
        onEntered={onEntered}
        onEntering={onEntering}
        onExit={onExit}
        onExited={onExited}
        onExiting={onExiting}
        {...TransitionProps}
      >
        {/* roles are applied via cloneElement from TransitionComponent */}
        {/* roles needs to be applied on the immediate child of Modal or it'll inject one */}
>>>>>>> refactor(Dialog): use treat
        <div
          className={clsx(
            classes.container,
            classes[`scroll${capitalize(scroll)}` as keyof typeof classes],
          )}
          onClick={handleBackdropClick}
          onMouseDown={handleMouseDown}
        >
          <PaperComponent
<<<<<<< HEAD
            shadow="large"
            role="dialog"
=======
            role="dialog"
            shadow="large"
>>>>>>> refactor(Dialog): use treat
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
<<<<<<< HEAD
      </Modal>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Dialog.displayName = 'Dialog';
}

const StyledDialog = withStyles(styles)(Dialog);
export { StyledDialog as Dialog };
=======
      </TransitionComponent>
    </Modal>
  );
});
>>>>>>> refactor(Dialog): use treat
