import { styleMap } from '../styles/treat';

export const styles = styleMap(() => ({
  root: {
    width: '100%',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  overflowing: {
    overflow: 'auto',
    backfaceVisibility: 'hidden',
    willChange: 'scroll-position',
    WebkitOverflowScrolling: 'touch',
  },
}));
