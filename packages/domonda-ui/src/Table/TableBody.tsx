/**
 *
 * TableBody
 *
 */

import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '../styles';
import { tableRowClassName } from './TableRow';
import { tableCellClassName } from './TableCell';
import clsx from 'clsx';

const styles = createStyles(({ palette, shadows, transition, typography }) => ({
  root: {
    display: 'table-row-group',
    [`& > .${tableRowClassName}`]: {
      borderBottom: `1px solid ${palette.border}`,
      backgroundColor: palette.light('background'),
      [`& .${tableCellClassName}`]: typography.body,
    },
    [`& > a.${tableRowClassName}`]: {
      transition: transition.create(['box-shadow', 'background-color']),
      cursor: 'pointer',
      boxShadow: 'none',
      position: 'relative',
      '&:hover, &:focus': {
        zIndex: 1,
        boxShadow: shadows[2],
        borderColor: 'transparent',
        backgroundColor: palette.surface,
      },
      '&:focus': {
        outline: `3px solid ${palette.light('primary')}`,
      },
    },
  },
}));

interface TableBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const TableBody: React.FC<TableBodyProps & WithStyles<typeof styles>> = (props) => {
  const { classes, className, children, ...rest } = props;
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {children}
    </div>
  );
};

const StyledTableBody = withStyles(styles)(TableBody);
export { StyledTableBody as TableBody };
