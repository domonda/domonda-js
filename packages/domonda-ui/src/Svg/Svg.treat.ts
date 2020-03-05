import { style, styleMap, globalStyle, Style } from '../styles/treat';

export const root = style({
  display: 'flex',
});

export const sizes = styleMap(({ typography: { sizes } }) => ({
  ...Object.keys(sizes).reduce<Record<string, Style>>(
    (acc, size) => ({
      ...acc,
      [size]: {
        height: sizes[size as keyof typeof sizes],
      },
    }),
    {},
  ),
}));

globalStyle(`${root} > svg`, {
  height: 'inherit',
  color: 'inherit',
  fill: 'currentColor',
});
