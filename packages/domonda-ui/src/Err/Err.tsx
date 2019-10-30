/**
 *
 * Err
 *
 */

import React from 'react';
import { Flex, FlexProps } from '../Flex';
import { Text } from '../Text';
import { Button } from '../Button';

export interface ErrProps extends FlexProps {
  error: Error;
  onRetry?: (() => void) | null;
}

export const Err = React.forwardRef<HTMLElement, ErrProps>(function Err(props, ref) {
  const { children, error, onRetry, ...rest } = props;
  return (
    <Flex container align="center" justify="center" {...rest} ref={ref}>
      <Flex item style={{ textAlign: 'center' }}>
        <Text color="danger">{error.message}</Text>
        {onRetry && (
          <Button variant="contained" color="danger" onClick={onRetry}>
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
