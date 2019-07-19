/**
 *
 * TableCell
 *
 */

import * as React from 'react';
import { createStyles, withStyles, WithStyles, generateStaticClassName } from '../styles';
import clsx from 'clsx';

const styles = createStyles(({ spacing }) => ({
  root: {
    padding: spacing(1.5, 1),
    verticalAlign: 'middle',
    minWidth: 48,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  rtl: {
    textAlign: 'right',
  },
}));

export interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  basis?: React.CSSProperties['flexBasis'];
  grow?: React.CSSProperties['flexGrow'];
  shrink?: React.CSSProperties['flexShrink'];
  rtl?: boolean;
}

export const tableCellClassName = generateStaticClassName('TableCell');

const TableCell: React.FC<TableCellProps & WithStyles<typeof styles>> = (props) => {
  const { classes, className, children, style, basis, grow, shrink, rtl, ...rest } = props;

  return (
    <div
      {...rest}
      className={clsx(tableCellClassName, classes.root, rtl && classes.rtl, className)}
      style={{ flexBasis: basis, flexGrow: grow, flexShrink: shrink, ...style }}
    >
      {children}
    </div>
  );
};

const StyledTableCell = withStyles(styles)(TableCell);
export { StyledTableCell as TableCell };
