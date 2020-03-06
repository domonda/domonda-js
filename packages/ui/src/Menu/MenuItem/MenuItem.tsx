/**
 *
 * MenuItem
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../../styles/treat';

import * as styles from './MenuItem.treat';

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  highlighted?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(function MenuItem(
  props,
  ref,
) {
  const {
    children,
    className,
    component: Component = 'li' as React.ElementType<React.ComponentPropsWithRef<'li'>>,
    highlighted,
    selected,
    disabled,
    tabIndex,
    onClick,
    ...rest
  } = props;

  const classes = useStyles(styles);

  return (
    <Component
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
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !tabIndex ? 0 : tabIndex}
      onClick={onClick}
    >
      <span className={classes.text}>{children}</span>
    </Component>
  );
});
