/**
 *
 * Menu
 *
 */

import * as React from 'react';
import clsx from 'clsx';

// decorate
import { decorate, Decorate } from './decorate';

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Decorate['classes'];
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

const Menu = React.forwardRef<HTMLElement, MenuProps & Decorate>(function Menu(props, ref) {
  const {
    component: Component = 'nav' as React.ElementType<React.ComponentPropsWithRef<'nav'>>,
    children,
    classes,
    className,
    ...rest
  } = props;

  return (
    <Component {...rest} ref={ref} className={clsx(classes.root, className)}>
      <ul className={classes.list}>{children}</ul>
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}

const StyledMenu = decorate(Menu);
export { StyledMenu as Menu };
