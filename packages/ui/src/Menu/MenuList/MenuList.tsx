/**
 *
 * MenuList
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from 'react-treat';

import * as styles from './MenuList.treat';

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const MenuList = React.forwardRef<HTMLUListElement, MenuListProps>(function MenuList(
  props,
  ref,
) {
  const { children, className, ...rest } = props;

  const classes = useStyles(styles);

  return (
    <ul {...rest} ref={ref} className={clsx(classes.root, className)}>
      {children}
    </ul>
  );
});
