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
import { IconButton } from '../Button/IconButton';
import { SvgClearIcon } from '../SvgIcon/SvgClearIcon';

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
        <IconButton autoFocus={autoFocusClose} variant="text" color={color} onClick={onClose}>
          <SvgClearIcon />
        </IconButton>
      )}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}

const StyledAlert = decorate(Alert);
export { StyledAlert as Alert };
