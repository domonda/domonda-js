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
  classes?: Partial<Decorate['classes']>;
  className?: string;
  component?: React.ComponentType<{ className: string; role: string; children: React.ReactNode[] }>;
}

export function makeRowHeader<Item>(config: Config<Item>) {
  const { columns } = config;

  const RowHeader = React.forwardRef<HTMLElement, RowHeaderProps & Decorate>(function RowHeader(
    props,
    ref,
  ) {
    const { children: _0, classes, className, component: Component = 'div', ...rest } = props;

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
      <Component className={clsx(classes.root, className)} role="row" ref={ref as any}>
        {children}
      </Component>
    );
  });

  if (process.env.NODE_ENV !== 'production') {
    RowHeader.displayName = 'RowHeader';
  }

  return React.memo(decorate(RowHeader));
}
