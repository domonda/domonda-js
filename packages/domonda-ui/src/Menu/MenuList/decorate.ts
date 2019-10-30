import { createStyles, withStyles, WithStyles } from '../../styles';

const styles = createStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: 0,
    padding: spacing('tiny', 'none'),
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
