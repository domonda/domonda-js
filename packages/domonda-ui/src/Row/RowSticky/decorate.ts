import { createStyles, withStyles, WithStyles } from '../../styles';
import sharedStyles from '../sharedStyles';

const styles = createStyles((theme) => {
  const { row, ...rest } = sharedStyles(theme);

  return {
    ...rest,
    root: {
      ...row,
      ...theme.typography.caption,
      fontWeight: theme.typography.weights.semiBold,
      position: 'sticky',
      top: 0,
      zIndex: 1,
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.background,
    },
  };
});

export type Decorate = WithStyles<typeof styles>;

export default withStyles(styles);
