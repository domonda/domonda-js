/**
 *
 * Menu
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Popover, PopoverProps, PopoverOrigin } from '../Popover';

// decorate
import { decorate, Decorate } from './decorate';

// parts
import { MenuList, MenuListProps } from './MenuList';

type ExtendingProps = Omit<PopoverProps, 'classes'>;

export interface MenuProps extends ExtendingProps {
  classes?: Partial<Decorate['classes']>;
  PopoverClasses?: PopoverProps['classes'];
  MenuListProps?: MenuListProps;
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps & Decorate>(function Menu(props, ref) {
  const {
    children,
    classes,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' } as PopoverOrigin,
    PopoverClasses,
    PaperProps = {},
    transformOrigin = {
      vertical: 'top',
      horizontal: 'center',
    } as PopoverOrigin,
    MenuListProps,
    ...rest
  } = props;

  return (
    <Popover
      ref={ref}
      anchorOrigin={anchorOrigin}
      classes={PopoverClasses}
      PaperProps={{
        ...PaperProps,
        classes: {
          ...PaperProps.classes,
          root: clsx(classes.root, PaperProps.classes && PaperProps.classes.root),
        },
      }}
      transformOrigin={transformOrigin}
      {...rest}
    >
      <MenuList {...MenuListProps}>{children}</MenuList>
    </Popover>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}

const StyledMenu = decorate(Menu);
export { StyledMenu as Menu };
