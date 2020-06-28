/**
 *
 * Row/RowItem
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';

import { useStyles } from 'react-treat';

import { Config } from '../makeRow';

import * as styles from './makeRowItem.treat';

export interface RowItemProps<Item> extends React.HTMLAttributes<HTMLElement> {
  component?: React.ComponentType<{
    className: string;
    children: React.ReactNode[];
    item: Item;
    role: string;
  }>;
  item: Item;
  clickable?: boolean;
}

export function makeRowItem<Item>(config: Config<Item>) {
  const { columns } = config;

  const RowItem = React.forwardRef<HTMLElement, RowItemProps<Item>>(function RowItem(props, ref) {
    const { className, component: Component = 'div', item, clickable, ...rest } = props;

    const classes = useStyles(styles);

    const children = useMemo(
      () =>
        columns.map(
          (
            { width, minWidth, maxWidth, flexGrow, flexShrink, textAlign, style, ItemCell },
            index,
          ) => (
            <div
              key={index.toString()}
              aria-colindex={index + 1}
              className={classes.cell}
              style={{
                width,
                minWidth,
                maxWidth,
                flexGrow,
                flexShrink,
                textAlign,
                ...style,
              }}
              role="gridcell"
            >
              {typeof ItemCell === 'function' ? <ItemCell item={item} /> : ItemCell}
            </div>
          ),
        ),
      [classes, className, item],
    );

    return (
      <Component
        {...rest}
        ref={ref as any}
        className={clsx(classes.root, classes.row, clickable && classes.clickable, className)}
        // we don't put the Item on string components because they don't accept objects as valid attributes
        item={typeof Component === 'string' ? (undefined as any) : item}
        role="row"
      >
        {children}
      </Component>
    );
  });

  return React.memo(RowItem);
}
