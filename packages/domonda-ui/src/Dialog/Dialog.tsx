/**
 *
 * Dialog
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles } from '../styles';
import { capitalize } from '../utils';
import { Modal, ModalProps } from '../Modal';
import { Backdrop } from '../Backdrop';
import { Fade } from '../Fade';
import { defaultDuration, TransitionHandlerProps } from '../styles/transition';
import { Paper, PaperProps } from '../Paper';
import { TransitionProps } from 'react-transition-group/Transition';
import { WithStyles } from 'react-jss';

const styles = createStyles({
  /* Styles applied to the root element. */
  root: {
    '@media print': {
      // Use !important to override the Modal inline-style.
      position: 'absolute !important' as any,
    },
  },
  /* Styles applied to the container element if `scroll="paper"`. */
  scrollPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Styles applied to the container element if `scroll="body"`. */
  scrollBody: {
    overflowY: 'auto',
    overflowX: 'hidden',
    textAlign: 'center',
    '&:after': {
      content: '""',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: '100%',
      width: '0',
    },
  },
  /* Styles applied to the container element. */
  container: {
    height: '100%',
    '@media print': {
      height: 'auto',
    },
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  },
  /* Styles applied to the `Paper` component. */
  paper: {
    margin: 48,
    position: 'relative',
    overflowY: 'auto', // Fix IE 11 issue, to remove at some point.
    '@media print': {
      overflowY: 'visible',
      boxShadow: 'none',
    },
  },
  /* Styles applied to the `Paper` component if `scroll="paper"`. */
  paperScrollPaper: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 96px)',
  },
  /* Styles applied to the `Paper` component if `scroll="body"`. */
  paperScrollBody: {
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'left', // 'initial' doesn't work on IE 11
  },
  /* Styles applied to the `Paper` component if `maxWidth=false`. */
  paperWidthFalse: {
    maxWidth: 'calc(100% - 96px)',
  },
  /* Styles applied to the `Paper` component if `fullWidth={true}`. */
  paperFullWidth: {
    width: 'calc(100% - 96px)',
  },
  /* Styles applied to the `Paper` component if `fullScreen={true}`. */
  paperFullScreen: {
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'none',
    borderRadius: 0,
    '&$paperScrollBody': {
      margin: 0,
      maxWidth: '100%',
    },
  },
});

const defaultTransitionDuration = {
  enter: defaultDuration.enteringScreen,
  exit: defaultDuration.leavingScreen,
};

type ExtendingProps = Omit<ModalProps, 'children'> & Partial<TransitionHandlerProps>;

export interface DialogProps extends ExtendingProps {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  children?: React.ReactNode;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: false;
  PaperComponent?: React.ComponentType<PaperProps>;
  PaperProps?: Partial<PaperProps>;
  scroll?: 'body' | 'paper';
  TransitionComponent?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'];
  TransitionProps?: TransitionProps;
}

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
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
      onEnter,
      onEntered,
      onEntering,
      onEscapeKeyDown,
      onExit,
      onExited,
      onExiting,
      open,
      PaperComponent = Paper,
      PaperProps = {},
      scroll = 'paper',
      TransitionComponent = Fade,
      transitionDuration = defaultTransitionDuration,
      TransitionProps,
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
        BackdropProps={{
          transitionDuration,
          ...BackdropProps,
        }}
        closeAfterTransition
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        onEscapeKeyDown={onEscapeKeyDown}
        onClose={onClose}
        open={open}
        ref={ref}
        {...other}
      >
        <TransitionComponent
          appear
          in={open}
          timeout={transitionDuration}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          role="none presentation"
          {...TransitionProps}
        >
          {/* roles are applied via cloneElement from TransitionComponent */}
          {/* roles needs to be applied on the immediate child of Modal or it'll inject one */}
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
        </TransitionComponent>
      </Modal>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Dialog.displayName = 'Dialog';
}

const StyledDialog = withStyles(styles)(Dialog);
export { StyledDialog as Dialog };
