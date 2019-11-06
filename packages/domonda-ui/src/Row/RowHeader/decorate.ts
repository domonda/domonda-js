import { createStyles, withStyles, WithStyles } from '../../styles';
import sharedStyles from '../sharedStyles';

const styles = createStyles((theme) => {
  const { row, cell, ...rest } = sharedStyles(theme);
  return {
    ...rest,
    root: {
      ...row,
      zIndex: 2,
      boxShadow: theme.shadows.line,
      border: `1px solid ${theme.palette.border}`,
      backgroundColor: theme.palette.darken('background', 0.05),
    },
    cell: {
      ...cell,
      ...theme.typography.variant('small', 'semiBold'),
    },
  };
});

export type Decorate = WithStyles<typeof styles>;

export default withStyles(styles);
