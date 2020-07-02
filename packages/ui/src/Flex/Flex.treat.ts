import { style, styleMap, globalStyle, Style } from 'treat';
import { SIZES, Size } from '../styles/sizes';

export const container = style(() => ({
  display: 'flex',
  width: '100%',
  flexWrap: 'nowrap',
}));

export const item = style(() => ({}));

export const wrap = style(() => ({
  flexWrap: 'wrap',
}));

export const overflowing = style(() => ({
  overflow: 'auto',
  '--webkit-overflow-scrolling': 'touch',
  willChange: 'scroll-position',
  backfaceVisibility: 'hidden',
}));

export const zeroMinWidth = style(() => ({
  minWidth: 0,
}));

export const spaces = styleMap(({ sizing }) => ({
  ...SIZES.reduce<Record<string, Style>>(
    (acc, space) => ({
      ...acc,
      [space]: {
        width: `calc(100% + ${sizing(space)})`,
        margin: `calc(${sizing(space)} / 2 * -1)`,
      },
    }),
    {},
  ),
}));

Object.keys(spaces).forEach((key) => {
  const className = spaces[key as keyof typeof spaces];
  const space = key as Size;
  globalStyle(`${className} > ${item}:not(:empty)`, ({ sizing }) => ({
    padding: `calc(${sizing(space)} / 2)`,
  }));
});
