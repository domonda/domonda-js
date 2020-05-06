import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles(({ spacing }) => ({
  root: {
    position: 'relative',
  },
  clearButton: {
    zIndex: 1,
    position: 'absolute',
    top: spacing('tiny'),
    right: spacing('tiny'),
    '&$hasLabel': {
      top: spacing('tiny') * 3 - 1,
    },
    '&$dense': {
      top: spacing('tiny') - 1,
      right: spacing('tiny') - 1,
      '&$hasLabel': {
        top: spacing('tiny') * 3 - 2,
      },
    },
  },
  inputWithClearButton: {
    paddingRight: `${spacing('tiny') * 4}px !important`,
    '&$dense': {
      paddingRight: `${spacing('tiny') * 3}px !important`,
    },
  },
  hasLabel: {},
  dense: {},
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
