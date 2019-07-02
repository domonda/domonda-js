import * as React from 'react';
import clsx from 'clsx';
import { generateStaticClassName, withStyles, WithStyles, createStyles } from '../styles';

const styles = createStyles({
  root: {
    display: 'flex',
    all: 'unset',
  },
});

interface Props {
  children: React.ReactNode;
  component?: React.ReactType;
}

export const tableRowClassName = generateStaticClassName('TableRow');

const TableRow: React.FC<Props & WithStyles<typeof styles>> = (props) => {
  const { classes, children, component } = props;
  const Component = component || 'div';
  return <Component className={clsx(classes.root, tableRowClassName)}>{children}</Component>;
};

const StyledTableRow = withStyles(styles)(TableRow);
export { StyledTableRow as TableRow };
