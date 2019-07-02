import * as React from 'react';
import { createStyles, withStyles, WithStyles, generateStaticClassName } from '../styles';
import clsx from 'clsx';

const styles = createStyles(({ spacing }) => ({
  root: {
    flexGrow: 1,
    padding: spacing(1.5, 1),
    verticalAlign: 'middle',
    minWidth: 48,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  sticky: {
    position: 'sticky',
    zIndex: 2,
    left: 0,
  },
}));

interface Props {
  children: React.ReactNode;
  sticky?: boolean;
}

export const tableCellStickyClassName = generateStaticClassName('TableCell--sticky');
export const tableCellClassName = generateStaticClassName('TableCell');

const TableCell: React.FC<Props & WithStyles<typeof styles>> = (props) => {
  const { classes, children, sticky } = props;
  const className = clsx(tableCellClassName, classes.root, {
    [classes.sticky]: sticky,
    [tableCellStickyClassName]: sticky,
  });

  return <div className={className}>{children}</div>;
};

const StyledTableCell = withStyles(styles)(TableCell);
export { StyledTableCell as TableCell };
