/**
 *
 * Err
 *
 */

import React from 'react';

import { Button } from '../Button';
import { Flex, FlexProps } from '../Flex';
import { Pre } from '../Typography';

export interface ErrProps extends FlexProps {
  error: Error;
  onRetry?: (() => void) | null;
}

export const Err = React.forwardRef<HTMLElement, ErrProps>(function Err(props, ref) {
  const { children, error, onRetry, ...rest } = props;

  return (
    <Flex
      ref={ref}
      container
      fill
      align="center"
      direction="column"
      justify="center"
      spacing="small"
      {...rest}
    >
      <Flex item style={{ textAlign: 'center' }}>
        <Pre color="danger">{error.message}</Pre>
      </Flex>

      {onRetry && (
        <Flex item>
          <Button variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        </Flex>
      )}
    </Flex>
  );
});
