/**
 *
 * Row/RowItem
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Config } from '../makeRow';

// decorate
import decorate, { Decorate } from './decorate';

export interface RowItemProps<Item> {
  classes?: Decorate['classes'];
  className?: string;
  component?: React.ComponentType<{
    item: Item;
    className: string;
    role: string;
    children: React.ReactNode[];
  }>;
  item: Item;
}

export function makeRowItem<Item>(config: Config<Item>) {
  const { columns } = config;

  const RowItem: React.FC<Decorate & RowItemProps<Item>> = (props) => {
    const { classes, item, className, component: Component = 'div' } = props;
    const children = useMemo(
      () =>
        columns.map(
          (
            { width, minWidth, maxWidth, flexGrow, flexShrink, textAlign, style, ItemCell },
            index,
          ) => (
            <div
              key={index.toString()}
              className={classes.cell}
              role="gridcell"
              aria-colindex={index + 1}
              style={{
                width,
                minWidth,
                maxWidth,
                flexGrow,
                flexShrink,
                textAlign,
                ...style,
              }}
            >
              {typeof ItemCell === 'function' ? <ItemCell item={item} /> : ItemCell}
            </div>
          ),
        ),
      [classes, className, item],
    );

    return (
      <Component item={item} className={clsx(classes.root, classes.row, className)} role="row">
        {children}
      </Component>
    );
  };

  return React.memo(decorate(RowItem));
}
