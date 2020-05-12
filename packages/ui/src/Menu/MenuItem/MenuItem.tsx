/**
 *
 * MenuItem
 *
 */

import React from 'react';
import clsx from 'clsx';

// decorate
import { decorate, Decorate } from './decorate';

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  classes?: Partial<Decorate['classes']>;
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  highlighted?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps & Decorate>(function MenuItem(
  props,
  ref,
) {
  const {
    component: Component = 'li' as React.ElementType<React.ComponentPropsWithRef<'li'>>,
    children,
    classes,
    className,
    highlighted,
    onClick,
    tabIndex,
    selected,
    disabled,
    ...rest
  } = props;

  return (
    <Component
      role={onClick ? 'button' : undefined}
      {...rest}
      ref={ref}
      className={clsx(
        classes.root,
        onClick && classes.clickable,
        highlighted && classes.highlighted,
        selected && classes.selected,
        disabled && classes.disabled,
        className,
      )}
      onClick={onClick}
      tabIndex={onClick && !tabIndex ? 0 : tabIndex}
    >
      <span className={classes.text}>{children}</span>
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  MenuItem.displayName = 'MenuItem';
}

const StyledMenuItem = decorate(MenuItem);
export { StyledMenuItem as MenuItem };
