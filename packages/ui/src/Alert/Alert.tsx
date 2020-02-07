/**
 *
 * Alert
 *
 */

import React from 'react';
import clsx from 'clsx';
import { styles } from './Alert.treat';
import { useStyles } from '../styles/treat';
import { Color } from '../styles/palette';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode | Error;
  color?: Color; // if `message instanceof Error` then default is: `danger`, otherwize: `secondary`
  actions?: React.ReactNode;
  flat?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  const {
    className,
    message,
    color = message instanceof Error ? 'danger' : 'secondary',
    actions,
    flat,
    ...rest
  } = props;

  const classes = useStyles(styles);

  return (
    <div
      ref={ref}
      className={clsx(
        classes.root,
        classes[color as keyof typeof classes],
        flat && classes.flat,
        className,
      )}
      role="alert"
      {...rest}
    >
      <div className={clsx(classes.message, actions && classes.rightMargin)}>
        {message instanceof Error ? message.message : message}
      </div>

      {actions}
    </div>
  );
});
