/**
 *
 * Row/RowSticky
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../../styles/treat';

import { Config } from '../makeRow';

import * as styles from './makeRowSticky.treat';

export interface RowStickyProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ComponentType<{ className: string; role: string }>;
}

export function makeRowSticky<Item>(_0: Config<Item>) {
  const RowSticky = React.forwardRef<HTMLElement, RowStickyProps>(function RowSticky(props, ref) {
    const { children, className, component: Component = 'div', ...rest } = props;

    const classes = useStyles(styles);

    return (
      <Component {...rest} ref={ref as any} className={clsx(classes.root, className)} role="row">
        {children}
      </Component>
    );
  });

  return React.memo(RowSticky);
}
