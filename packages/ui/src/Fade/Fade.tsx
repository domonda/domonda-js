/**
 *
 * Fade
 *
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Fade/Fade.js
 *
 */

import React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import { defaultDuration, reflow, getTransitionProps } from '../styles/transition';
import { useTheme, Theme } from '../styles/theme';
import { useForkRef } from '../utils';

const styles = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

const defaultTimeout = {
  enter: defaultDuration.enteringScreen,
  exit: defaultDuration.leavingScreen,
};

export interface FadeProps extends TransitionProps {
  children: React.DetailedReactHTMLElement<any, HTMLElement>;
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

/**
 * The Fade transition is used by the [Modal](/components/modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
export const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    children,
    in: inProp,
    onEnter,
    onExit,
    style,
    timeout = defaultTimeout,
    ...other
  } = props;
  const theme = useTheme();
  const handleRef = useForkRef(children.ref, ref);

  const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps(
      { style, timeout },
      {
        mode: 'enter',
      },
    );
    node.style.webkitTransition = theme.transition.create('opacity', transitionProps);
    node.style.transition = theme.transition.create('opacity', transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleExit = (node: HTMLElement) => {
    const transitionProps = getTransitionProps(
      { style, timeout },
      {
        mode: 'exit',
      },
    );
    node.style.webkitTransition = theme.transition.create('opacity', transitionProps);
    node.style.transition = theme.transition.create('opacity', transitionProps);

    if (onExit) {
      onExit(node);
    }
  };

  return (
    <Transition
      appear
      in={inProp}
      onEnter={handleEnter}
      onExit={handleExit}
      timeout={timeout}
      {...(other as any)}
    >
      {(state: any, childProps: any) => {
        return React.cloneElement(children, {
          style: {
            opacity: 0,
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...(styles as any)[state],
            ...style,
            ...children.props.style,
          },
          ref: handleRef,
          ...childProps,
        });
      }}
    </Transition>
  );
});
