/**
 *
 * Row/RowHeader
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';

import { useStyles } from 'react-treat';

import { Config } from '../makeRow';

import * as styles from './makeRowHeader.treat';

export interface RowHeaderProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ComponentType<{ className: string; role: string; children: React.ReactNode[] }>;
}

export function makeRowHeader<Item>(config: Config<Item>) {
  const { columns } = config;

  const RowHeader = React.forwardRef<HTMLElement, RowHeaderProps>(function RowHeader(props, ref) {
    const { children: _0, className, component: Component = 'div', ...rest } = props;

    const classes = useStyles(styles);

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
              {typeof HeaderCell === 'function' ? <HeaderCell /> : HeaderCell}
            </div>
          ),
        ),
      [classes],
    );

    return (
      <Component {...rest} ref={ref as any} className={clsx(classes.root, className)} role="row">
        {children}
      </Component>
    );
  });

  return React.memo(RowHeader);
}
