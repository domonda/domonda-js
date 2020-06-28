/**
 *
 * Paper
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from 'react-treat';
import { Shadow } from '../styles/shadows';

import * as styles from './Paper.treat';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  bordered?: boolean;
  square?: boolean;
  shadow?: Shadow;
}

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(function Paper(props, ref) {
  const {
    className,
    component: Component = 'div' as any,
    bordered,
    square = false,
    shadow = 'line',
    ...rest
  } = props;

  const classes = useStyles(styles);

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        classes.root,
        bordered && classes.bordered,
        !square && classes.rounded,
        classes.shadows[shadow],
        className,
      )}
    />
  );
});
