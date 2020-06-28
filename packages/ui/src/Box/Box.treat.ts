import { style } from 'treat';

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
  // @ts-expect-error: does indeed exist
  '--webkit-overflow-scrolling': 'touch',
});
