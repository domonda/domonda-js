import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '../styles';
import { tableRowClassName } from './TableRow';

const styles = createStyles(({ palette, shadows }) => ({
  root: {
    display: 'table-row-group',
    [`& > .${tableRowClassName}`]: {
      borderBottom: `1px solid ${palette.border}`,
      backgroundColor: palette.light('background'),
    },
    [`& > a.${tableRowClassName}`]: {
      transition: 'box-shadow 300ms, background-color 200ms',
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

interface Props {
  children: React.ReactNode;
}

const TableBody: React.FC<Props & WithStyles<typeof styles>> = (props) => {
  const { classes, children } = props;
  return <div className={classes.root}>{children}</div>;
};

const StyledTableBody = withStyles(styles)(TableBody);
export { StyledTableBody as TableBody };
