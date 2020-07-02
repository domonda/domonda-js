/**
 *
 * Loader
 *
 */

import React from 'react';
import clsx from 'clsx';
import { useStyles } from 'react-treat';
import * as classesRef from './Loader.treat';
import { Color } from '../styles/palette';

export interface LoaderProps extends React.HTMLProps<HTMLDivElement> {
  color?: Color; // default: `primary`
}

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(function Loader(props, ref) {
  const { children, className, color = 'primary', ...rest } = props;
  const classes = useStyles(classesRef);
  return (
    <div {...rest} ref={ref} className={clsx(classes.root, classes.colors[color])}>
      <div className={clsx(classes.outside, classes.box, classes.colors[color])} />
      <div className={clsx(classes.inside, classes.box, classes.colors[color])} />
    </div>
  );
});
