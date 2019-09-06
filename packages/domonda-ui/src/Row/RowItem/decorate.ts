import { createStyles, CSSProperties, withStyles, WithStyles } from '../../styles';
import sharedStyles from '../sharedStyles';

const styles = createStyles((theme) => {
  const { ...rest } = sharedStyles(theme);

  const clickable: CSSProperties = {
    transition: theme.transition.create(['box-shadow', 'background-color']),
    cursor: 'pointer',
    boxShadow: 'none',
    textDecoration: 'inherit',
    color: 'inherit',
    '&:hover, &:focus': {
      zIndex: 1,
      boxShadow: theme.shadows[2],
      borderColor: 'transparent',
      backgroundColor: theme.palette.surface,
    },
    '&:focus': {
      outline: `3px solid ${theme.palette.light('primary')}`,
    },
  };

  return {
    ...rest,
    root: {
      zIndex: 0,
      backgroundColor: theme.palette.light('background'),
      borderBottom: `1px solid ${theme.palette.border}`,
      '&:nth-child(even)': {
        backgroundColor: theme.palette.dark('surface'),
      },
      'a&': clickable,
    },
    clickable,
  };
});

export type Decorate = WithStyles<typeof styles>;

export default withStyles(styles);
