import { createStyles, withStyles, WithStyles } from '../../styles';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
});

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
