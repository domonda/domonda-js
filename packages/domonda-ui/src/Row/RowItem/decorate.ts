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
      boxShadow: theme.shadows.line,
      backgroundColor: theme.palette.white,
    },
    '&:focus': {
      outline: `3px solid ${theme.palette.light('primary')}`,
    },
    '&:active': {
      outline: 'none',
    },
  };

  return {
    ...rest,
    root: {
      zIndex: 0,
      borderBottom: `1px solid ${theme.palette.border}`,
      'a&': clickable,
      backgroundColor: theme.palette.lighten('gray08', 0.8),
      '&:nth-child(even)': {
        backgroundColor: theme.palette.lighten('gray08', 0.5),
      },
    },
    clickable,
  };
});

export type Decorate = WithStyles<typeof styles>;

export default withStyles(styles);
