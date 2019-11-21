/**
 *
 * Alert
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Color } from '../styles/palette';

// ui
import { Text } from '../Text';

// decorate
import { decorate, Decorate } from './decorate';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Partial<Decorate['classes']>;
  message: React.ReactNode | Error;
  color?: Color; // if `message instanceof Error` then default is: `danger`, otherwize: `secondary`
  actions?: React.ReactNode;
  flat?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps & Decorate>(function Alert(props, ref) {
  const {
    classes,
    className,
    message,
    color = message instanceof Error ? 'danger' : 'secondary',
    actions,
    flat,
    ...rest
  } = props;

  return (
    <div
      role="alert"
      {...rest}
      className={clsx(
        classes.root,
        classes[color as keyof typeof classes],
        flat && classes.flat,
        className,
      )}
      ref={ref}
    >
      <Text color="inherit" paragraph className={clsx(classes.message)}>
        {message instanceof Error ? message.message : message}
      </Text>
      {actions}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}

const StyledAlert = decorate(Alert);
export { StyledAlert as Alert };
