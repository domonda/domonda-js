import { style } from '../styles/treat';

export const root = style({
  width: '100%',
});

export const fill = style({
  width: '100%',
  height: '100%',
});

export const overflowing = style({
  overflow: 'auto',
  backfaceVisibility: 'hidden',
  willChange: 'scroll-position',
  WebkitOverflowScrolling: 'touch',
});
