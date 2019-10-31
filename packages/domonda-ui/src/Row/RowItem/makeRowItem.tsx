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
  classes?: Partial<Decorate['classes']>;
  className?: string;
  component?: React.ComponentType<{
    item: Item;
    className: string;
    role: string;
    children: React.ReactNode[];
  }>;
  item: Item;
  clickable?: boolean;
}

export function makeRowItem<Item>(config: Config<Item>) {
  const { columns } = config;

  const RowItem = React.forwardRef<HTMLElement, RowItemProps<Item> & Decorate>(function RowItem(
    props,
    ref,
  ) {
    const { classes, item, className, clickable, component: Component = 'div' } = props;
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
      <Component
        // we don't put the Item on string components because they don't accept objects as valid attributes
        item={typeof Component === 'string' ? (undefined as any) : item}
        className={clsx(classes.root, classes.row, clickable && classes.clickable, className)}
        role="row"
        ref={ref as any}
      >
        {children}
      </Component>
    );
  });

  if (process.env.NODE_ENV !== 'production') {
    RowItem.displayName = 'RowItem';
  }

  return React.memo(decorate(RowItem));
}
