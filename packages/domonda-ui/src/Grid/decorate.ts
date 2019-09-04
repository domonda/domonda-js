import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles({
  container: {
    display: 'grid',
    width: '100%',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  overflowing: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    willChange: 'scroll-position',
    backfaceVisibility: 'hidden',
  },
});

export type Decorate = WithStyles<typeof styles, true>;

export const decorate = withStyles(styles, { injectTheme: true });
