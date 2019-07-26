/**
 *
 * Row/RowHeader
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Config } from '../makeRow';

// decorate
import decorate, { Decorate } from './decorate';

export interface RowHeaderProps {
  classes?: Decorate['classes'];
  className?: string;
  Component?: React.ComponentType<{ className: string; role: string; children: React.ReactNode[] }>;
}

export function makeRowHeader<Item>(config: Config<Item>) {
  const { columns } = config;

  const RowHeader: React.FC<RowHeaderProps & Decorate> = (props) => {
    const { children: _0, classes, className, Component = 'div', ...rest } = props;

    const children = useMemo(
      () =>
        columns.map(
          (
            { width, minWidth, maxWidth, flexGrow, flexShrink, textAlign, style, HeaderCell },
            index,
          ) => (
            <div
              key={index.toString()}
              className={classes.cell}
              role="columnheader"
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
              {typeof HeaderCell === 'function' ? <HeaderCell {...rest} /> : HeaderCell}
            </div>
          ),
        ),
      [classes, rest],
    );

    return (
      <Component className={clsx(classes.root, className)} role="row">
        {children}
      </Component>
    );
  };

  return React.memo(decorate(RowHeader));
}
