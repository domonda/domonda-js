/**
 *
 * Grow
 *
 * https://github.com/mui-org/material-ui/blob/b18a78e8cdad5894e96e65d6451545e075ed9d15/packages/material-ui/src/Grow/Grow.js
 *
 */

import React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps, TransitionStatus } from 'react-transition-group/Transition';
import { useForkRef } from '../utils';
import { reflow, getTransitionProps } from '../styles/transition';
import { useTheme, Theme } from '../styles';

function getScale(value: number) {
  return `scale(${value}, ${value ** 2})`;
}

const styles: { [key: string]: object } = {
  entering: {
    opacity: 1,
    transform: getScale(1),
  },
  entered: {
    opacity: 1,
    transform: 'none',
  },
};

export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
  children: React.DetailedReactHTMLElement<any, HTMLElement>;
  ref?: React.Ref<unknown>;
  theme?: Theme;
  timeout?: TransitionProps['timeout'] | 'auto';
}

export const Grow = React.forwardRef<HTMLElement, GrowProps>(function Grow(props, ref) {
  const { children, in: inProp, onEnter, onExit, style, timeout = 'auto', ...other } = props;
  const timer = React.useRef<any>();
  const autoTimeout = React.useRef<any>();
  const handleRef = useForkRef(children.ref, ref);
  const theme = useTheme();

  const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    reflow(node); // So the animation always start from the start.

    const { duration: transitionDuration, delay } = getTransitionProps(
      { style, timeout: timeout === 'auto' ? undefined : timeout },
      {
        mode: 'enter',
      },
    );

    let duration;
    if (timeout === 'auto') {
      duration = theme.transition.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      theme.transition.create('opacity', {
        duration,
        delay,
      }),
      theme.transition.create('transform', {
        duration: duration * 0.666,
        delay,
      }),
    ].join(',');

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleExit = (node: HTMLElement) => {
    const { duration: transitionDuration, delay } = getTransitionProps(
      { style, timeout: timeout === 'auto' ? undefined : timeout },
      {
        mode: 'exit',
      },
    );

    let duration;
    if (timeout === 'auto') {
      duration = theme.transition.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      theme.transition.create('opacity', {
        duration,
        delay,
      }),
      theme.transition.create('transform', {
        duration: duration * 0.666,
        delay: delay || duration * 0.333,
      }),
    ].join(',');

    node.style.opacity = '0';
    node.style.transform = getScale(0.75);

    if (onExit) {
      onExit(node);
    }
  };

  const addEndListener = (_0: any, next: any) => {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Transition
      appear
      in={inProp}
      onEnter={handleEnter}
      onExit={handleExit}
      addEndListener={addEndListener}
      timeout={timeout === 'auto' ? null : timeout}
      {...(other as any)}
    >
      {(state: TransitionStatus, childProps: any) => {
        return React.cloneElement(children, {
          style: {
            opacity: 0,
            transform: getScale(0.75),
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...styles[state],
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

if (process.env.NODE_ENV !== 'production') {
  Grow.displayName = 'Grow';
}
