/**
 *
 * makeRow
 *
 */

import React from 'react';

// parts
import { makeRowHeader, RowHeaderProps } from './RowHeader';
import { makeRowSticky, RowStickyProps } from './RowSticky';
import { makeRowItem, RowItemProps } from './RowItem';

export interface Column<Item> {
  readonly HeaderCell: React.ReactNode | (() => React.ReactNode);
  readonly ItemCell: React.ReactNode | React.FC<{ readonly item: Item }>;
  readonly width: React.CSSProperties['width'];
  readonly minWidth?: React.CSSProperties['minWidth'];
  readonly maxWidth?: React.CSSProperties['maxWidth'];
  readonly flexGrow?: React.CSSProperties['flexGrow'];
  readonly flexShrink?: React.CSSProperties['flexShrink'];
  readonly textAlign?: React.CSSProperties['textAlign'];
  readonly style?: React.CSSProperties;
}

export type Columns<Item> = readonly Column<Item>[];

export interface Config<Item> {
  columns: Columns<Item>;
}

export interface Row<Item> {
  RowHeader: React.FC<RowHeaderProps>;
  RowSticky: React.FC<RowStickyProps>;
  RowItem: React.FC<RowItemProps<Item>>;
}

export const makeRow = <Item extends any>(config: Config<Item>): Row<Item> => {
  return {
    RowHeader: makeRowHeader(config),
    RowSticky: makeRowSticky(config),
    RowItem: makeRowItem(config),
  };
};
