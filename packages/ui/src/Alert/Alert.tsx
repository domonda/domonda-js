/**
 *
 * Alert
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Color } from '../styles/palette';
import { useStyles } from 'react-treat';
import * as classesRef from './Alert.treat';
import { P } from '../Typography';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
  color?: Color; // if `message instanceof Error` then default is: `danger`, otherwize: `secondary`
  flat?: boolean;
  message: React.ReactNode | Error;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  const {
    className,
    actions,
    message,
    color = message instanceof Error ? 'danger' : 'secondary',
    flat,
    ...rest
  } = props;
  const classes = useStyles(classesRef);

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(classes.root, flat && classes.flat, classes.colors[color], className)}
      role="alert"
    >
      <P className={clsx(classes.message, classes.colors[color], actions && classes.rightMargin)}>
        {message instanceof Error ? message.message : message}
      </P>
      {actions}
    </div>
  );
});
