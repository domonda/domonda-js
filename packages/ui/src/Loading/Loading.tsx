/**
 *
 * Loading
 *
 */

import React from 'react';

import { useStyles } from 'react-treat';

import { Flex, FlexProps } from '../Flex';
import { Text } from '../Text';

import * as styles from './Loading.treat';

export interface LoadingProps extends FlexProps {}

export const Loading = React.forwardRef<HTMLElement, LoadingProps>(function Loading(props, ref) {
  const { children, ...rest } = props;

  const classes = useStyles(styles);

  return (
    <Flex ref={ref} container align="center" justify="center" {...rest}>
      <Flex item className={classes.loadingContainer}>
        <Text inherit size="regular">
          Loading...
        </Text>
      </Flex>
    </Flex>
  );
});
