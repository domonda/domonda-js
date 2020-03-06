/**
 *
 * Menu
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { Popover, PopoverProps, PopoverOrigin } from '../Popover';

import * as styles from './Menu.treat';

// parts
import { MenuList, MenuListProps } from './MenuList';

export interface MenuProps extends PopoverProps {
  MenuListProps?: MenuListProps;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(props, ref) {
  const {
    children,
    anchorOrigin = { horizontal: 'center', vertical: 'bottom' } as PopoverOrigin,
    PaperProps = {},
    transformOrigin = {
      vertical: 'top',
      horizontal: 'center',
    } as PopoverOrigin,
    MenuListProps,
    ...rest
  } = props;

  const classes = useStyles(styles);

  return (
    <Popover
      {...rest}
      ref={ref}
      anchorOrigin={anchorOrigin}
      PaperProps={{
        ...PaperProps,
        className: clsx(classes.root, PaperProps.className),
      }}
      transformOrigin={transformOrigin}
    >
      <MenuList {...MenuListProps}>{children}</MenuList>
    </Popover>
  );
});
