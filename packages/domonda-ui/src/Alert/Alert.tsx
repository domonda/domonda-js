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
import { Button } from '../Button/Button';

// decorate
import { decorate, Decorate } from './decorate';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Partial<Decorate['classes']>;
  message: React.ReactNode | Error;
  color?: Color; // if `message instanceof Error` then default is: `danger`, otherwize: `secondary`
  onClose?: () => void;
  autoFocusClose?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps & Decorate>(function Alert(props, ref) {
  const {
    classes,
    className,
    message,
    color = message instanceof Error ? 'danger' : 'secondary',
    onClose,
    autoFocusClose,
    ...rest
  } = props;

  return (
    <div
      role="alert"
      {...rest}
      className={clsx(classes.root, classes[color as keyof typeof classes], className)}
      ref={ref}
    >
      <Text color={color} paragraph className={clsx(classes.message)}>
        {message instanceof Error ? message.message : message}
      </Text>
      {onClose && (
        <Button autoFocus={autoFocusClose} variant="text" color={color} onClick={onClose}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            className="svg-inline--fa fa-times fa-w-11"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </Button>
      )}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}

const StyledAlert = decorate(Alert);
export { StyledAlert as Alert };
