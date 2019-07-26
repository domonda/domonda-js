import { createStyles, withStyles, WithStyles } from '../../styles';
import sharedStyles from '../sharedStyles';

const styles = createStyles((theme) => {
  const { ...rest } = sharedStyles(theme);

  return {
    ...rest,
    root: {
      zIndex: 0,
      backgroundColor: theme.palette.light('background'),
      borderBottom: `1px solid ${theme.palette.border}`,
      '&:nth-child(even)': {
        backgroundColor: theme.palette.surface,
      },
    },
    clickable: {
      outline: 'none',
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: `rgba(0, 0, 0, 0.08) !important`,
      },
    },
  };
});

export type Decorate = WithStyles<typeof styles>;

export default withStyles(styles);
