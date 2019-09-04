/**
 *
 * Err
 *
 */

import React from 'react';
import { Flex, FlexProps } from '../Flex';
import { Button } from '../Button';

export interface ErrProps extends FlexProps {
  error: Error;
  onRetry?: (() => void) | null;
}

export const Err = React.forwardRef<HTMLElement, ErrProps>(function Err(props) {
  const { children, error, onRetry, ...rest } = props;
  return (
    <Flex container align="center" justify="center" {...rest}>
      <Flex item style={{ textAlign: 'center' }}>
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
        {onRetry && (
          <Button variant="contained" color="error" onClick={onRetry}>
            Retry
          </Button>
        )}
      </Flex>
    </Flex>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Err.displayName = 'Err';
}
