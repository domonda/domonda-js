import { makeCreateStyles, withStyles, WithStyles } from '../styles';
import { BoxProps } from './Box';

const styles = makeCreateStyles<BoxProps>()((theme) => ({
  root: {
    width: '100%',
  },
  padding: ({ padding = 0 }) => {
    if (Array.isArray(padding)) {
      return {
        padding: (theme as any).spacing(...padding),
      };
    }
    return {
      padding: theme.spacing(padding),
    };
  },
  margin: ({ margin = 0 }) => {
    if (Array.isArray(margin)) {
      return {
        margin: (theme as any).spacing(...margin),
      };
    }
    return {
      margin: theme.spacing(margin),
    };
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  overflowing: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    willChange: 'scroll-position',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
