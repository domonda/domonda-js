import * as React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
});

export interface TableProps extends React.ButtonHTMLAttributes<HTMLTableElement> {
  classes?: WithStyles<typeof styles>['classes'];
}

const Table: React.FC<TableProps & WithStyles<typeof styles>> = (props) => {
  const { classes, className, children } = props;
  return <div className={clsx(classes.root, className)}>{children}</div>;
};

const StyledTable = withStyles(styles)(Table);
export { StyledTable as Table };
