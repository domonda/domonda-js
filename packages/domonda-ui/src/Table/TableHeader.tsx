/**
 *
 * TableHeader
 *
 */

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '../styles';
import clsx from 'clsx';

const styles = createStyles(({ palette, typography }) => ({
  root: {
    zIndex: 1,
    display: 'table-header-group',
    fontSize: typography.caption.fontSize,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    borderBottom: `1px solid ${palette.border}`,
    color: palette.light('textPrimary'),
    backgroundColor: palette.dark('background'),
  },
}));

export interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const TableHeader: React.FC<TableHeaderProps & WithStyles<typeof styles>> = (props) => {
  const { classes, className, children, ...rest } = props;
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {children}
    </div>
  );
};

const StyledTableHeader = withStyles(styles)(TableHeader);
export { StyledTableHeader as TableHeader };
