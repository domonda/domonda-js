import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '../styles';
import { tableCellStickyClassName, tableCellClassName } from './TableCell';

const styles = createStyles(({ palette, spacing }) => ({
  root: {
    display: 'table-header-group',
    fontSize: 12,
    fontWeight: 700,
    color: palette.light('textPrimary'),
    zIndex: 1,
    backgroundColor: palette.dark('background'),
    textTransform: 'uppercase',
    borderBottom: `1px solid ${palette.border}`,
    [`& .${tableCellClassName}`]: {
      padding: spacing(1, 1),
    },
    [`& .${tableCellStickyClassName}`]: {
      zIndex: 3,
    },
  },
}));

interface Props {
  children: React.ReactNode;
}

const TableHeader: React.FC<Props & WithStyles<typeof styles>> = (props) => {
  const { classes, children } = props;
  return <div className={classes.root}>{children}</div>;
};

const StyledTableHeader = withStyles(styles)(TableHeader);
export { StyledTableHeader as TableHeader };
