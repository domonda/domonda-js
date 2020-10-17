import { style, styleMap, Style } from 'treat';
import { SIZES, Size } from '../styles/sizes';
import { COLORS, Color } from '../styles/palette';

export const root = style({
  display: 'inline-flex',
  fill: 'currentColor',
});

export const sizes = styleMap(({ sizing }) => ({
  ...SIZES.reduce((acc, size) => {
    return {
      ...acc,
      [size]: {
        height: sizing(size as Size),
      },
    };
  }, {} as Record<Size, Style>),
}));

export const colors = styleMap(({ palette }) =>
  COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        color: palette[color],
      },
    }),
    {} as Record<Color, Style>,
  ),
);
