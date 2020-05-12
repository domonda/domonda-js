/**
 *
 * RowSticky
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Config } from '../makeRow';

// decorate
import decorate, { Decorate } from './decorate';

export interface RowStickyProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Partial<Decorate['classes']>;
  component?: React.ComponentType<{ className: string; role: string }>;
}

export function makeRowSticky<Item>(_0: Config<Item>) {
  const RowSticky = React.forwardRef<HTMLElement, RowStickyProps & Decorate>(function RowSticky(
    props,
    ref,
  ) {
    const { children, classes, className, component: Component = 'div', ...rest } = props;
    return (
      <Component {...rest} className={clsx(classes.root, className)} role="row" ref={ref as any}>
        {children}
      </Component>
    );
  });

  if (process.env.NODE_ENV !== 'production') {
    RowSticky.displayName = 'RowSticky';
  }

  return React.memo(decorate(RowSticky));
}
