import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles((theme) => ({
  root: {
    margin: 0,
    color: theme.palette.textPrimary,
  },
  block: {
    display: 'block',
  },
  inline: {
    display: 'inline',
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
}));

export type Decorate = WithStyles<typeof styles, true>;

export const decorate = withStyles(styles, { injectTheme: true });
