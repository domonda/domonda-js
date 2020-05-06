import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles(({ spacing }) => ({
  root: {
    position: 'relative',
  },
  clearButton: {
    zIndex: 1,
    position: 'absolute',
    right: spacing('tiny'),
    bottom: spacing('tiny'),
    '&$dense': {
      right: spacing('tiny') - 1,
      bottom: spacing('tiny') - 1,
    },
  },
  inputWithClearButton: {
    paddingRight: `${spacing('tiny') * 4}px !important`,
    '&$dense': {
      paddingRight: `${spacing('tiny') * 3}px !important`,
    },
  },
  dense: {},
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
