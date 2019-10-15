/**
 *
 * MenuList
 *
 */

import React from 'react';
import clsx from 'clsx';

// decorate
import { decorate, Decorate } from './decorate';

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  classes?: Partial<Decorate['classes']>;
}

const MenuList = React.forwardRef<HTMLUListElement, MenuListProps & Decorate>(function MenuList(
  props,
  ref,
) {
  const { children, classes, className, ...rest } = props;
  return (
    <ul {...rest} ref={ref} className={clsx(classes.root, className)}>
      {children}
    </ul>
  );
});

if (process.env.NODE_ENV !== 'production') {
  MenuList.displayName = 'MenuList';
}

const StyledMenuList = decorate(MenuList);
export { StyledMenuList as MenuList };
