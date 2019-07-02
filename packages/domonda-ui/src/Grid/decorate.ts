import { makeCreateStyles, withStyles, WithStyles } from '../styles';
import { GridProps } from './Grid';

const styles = makeCreateStyles<GridProps>()((theme) => ({
  container: {
    display: 'grid',
    width: '100%',
  },
  template: ({ template }) => ({
    gridTemplate: typeof template === 'function' ? template(theme) : template,
  }),
  area: ({ area }) => ({
    gridArea: area,
  }),
  gap: ({ gap }) => ({
    gridGap: typeof gap === 'function' ? gap(theme) : gap,
  }),
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
