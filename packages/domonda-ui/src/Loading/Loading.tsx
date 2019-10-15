/**
 *
 * Loading
 *
 */

import React from 'react';
import { Flex, FlexProps } from '../Flex';
import { Text } from '../Text';

// decorate
import { decorate, Decorate } from './decorate';

export interface LoadingProps extends Omit<FlexProps, 'classes'> {
  classes?: Partial<Decorate['classes']>;
  FlexClasses?: FlexProps['classes'];
}

const Loading = React.forwardRef<HTMLElement, LoadingProps & Decorate>(function Loading(
  props,
  ref,
) {
  const { children, classes, FlexClasses, ...rest } = props;
  return (
    <Flex container align="center" justify="center" {...rest} ref={ref} classes={FlexClasses}>
      <Flex item className={classes.loadingContainer}>
        <Text variant="title" color="inherit">
          Loading...
        </Text>
      </Flex>
    </Flex>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Loading.displayName = 'Loading';
}

const StyledLoading = decorate(Loading);
export { StyledLoading as Loading };
