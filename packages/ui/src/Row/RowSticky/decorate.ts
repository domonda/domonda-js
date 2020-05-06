import { createStyles, withStyles, WithStyles } from '../../styles';
import sharedStyles from '../sharedStyles';

const styles = createStyles((theme) => {
  const { row, ...rest } = sharedStyles(theme);

  return {
    ...rest,
    root: {
      ...row,
      ...theme.typography.variant('small', 'medium'),
      position: 'sticky',
      top: 0,
      zIndex: 2,
      boxShadow: theme.shadows.line,
      border: `1px solid ${theme.palette.border}`,
      backgroundColor: theme.palette.darken('background', 0.03),
    },
  };
});

export type Decorate = WithStyles<typeof styles>;

export default withStyles(styles);
