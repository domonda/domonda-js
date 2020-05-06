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
  },
  inputWithClearButton: {
    paddingRight: `${spacing('tiny') * 4}px !important`,
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
