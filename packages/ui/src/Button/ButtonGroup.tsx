/**
 *
 * ButtonGroup
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';

import { styles } from './ButtonGroup.treat';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  props,
  ref,
) {
  const { children, className, ...rest } = props;

  const classes = useStyles(styles);

  return (
    <div {...rest} ref={ref} className={clsx(classes.root, className)}>
      {children}
    </div>
  );
});
