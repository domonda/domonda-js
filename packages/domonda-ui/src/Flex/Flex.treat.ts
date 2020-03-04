import { style, styleMap, globalStyle, Style } from '../styles/treat';
import { SPACES, Space } from '../styles/spacing';

export const container = style({
  flexWrap: 'nowrap',
  display: 'flex',
  width: '100%',
});

export const item = style({});

export const wrap = style({
  flexWrap: 'wrap',
});

export const overflowing = style({
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  willChange: 'scroll-position',
  backfaceVisibility: 'hidden',
});

export const zeroMinWidth = style({
  minWidth: 0,
});

export const spaces = styleMap(({ spacing }) => ({
  ...SPACES.reduce<Record<string, Style>>(
    (acc, space) => ({
      ...acc,
      [space]: {
        width: `calc(100% + ${spacing(space)}px)`,
        margin: (spacing(space) / 2) * -1,
      },
    }),
    {},
  ),
}));

Object.keys(spaces).forEach((key) => {
  const className = spaces[key as keyof typeof spaces];
  const space = key as Space;

  globalStyle(`${className} > ${item}:not(:empty)`, ({ spacing }) => ({
    padding: spacing(space) / 2,
  }));
});
