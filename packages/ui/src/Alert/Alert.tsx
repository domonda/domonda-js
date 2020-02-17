/**
 *
 * Alert
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { COLOR_PREFIX, Color } from '../styles/palette';

import { styles } from './Alert.treat';

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

  const classes = useStyles(styles);

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(
        classes.root,
        classes[(COLOR_PREFIX + color) as keyof typeof classes],
        flat && classes.flat,
        className,
      )}
      role="alert"
    >
      <div className={clsx(classes.message, actions && classes.rightMargin)}>
        {message instanceof Error ? message.message : message}
      </div>

      {actions}
    </div>
  );
});
