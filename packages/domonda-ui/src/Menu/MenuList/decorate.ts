import { createStyles, withStyles, WithStyles } from '../../styles';

const styles = createStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: 0,
    paddingTop: spacing('tiny') / 2,
    paddingRight: 0,
    paddingBottom: spacing('tiny') / 2,
    paddingLeft: 0,
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
