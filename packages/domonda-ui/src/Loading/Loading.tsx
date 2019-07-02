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

export type LoadingProps = FlexProps;

const Loading: React.FC<LoadingProps & Decorate> = (props) => {
  const { children, classes, ...rest } = props;
  return (
    <Flex container align="center" justify="center" {...rest}>
      <Flex item className={classes.loadingContainer}>
        <Text variant="title" color="inherit">
          Loading...
        </Text>
      </Flex>
    </Flex>
  );
};

const StyledLoading = decorate(Loading);
export { StyledLoading as Loading };
