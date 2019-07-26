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

export interface RowStickyProps {
  classes?: Decorate['classes'];
  className?: string;
  Component?: React.ComponentType<{ className: string; role: string }>;
}

export function makeRowSticky<Item>(_0: Config<Item>) {
  const RowSticky: React.FC<Decorate & RowStickyProps> = (props) => {
    const { children, classes, className, Component = 'div' } = props;
    return (
      <Component className={clsx(classes.root, className)} role="row">
        {children}
      </Component>
    );
  };

  return React.memo(decorate(RowSticky));
}
