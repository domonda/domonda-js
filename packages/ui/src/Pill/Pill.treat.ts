import { style, styleMap, Style, globalStyle } from 'treat';
import { COLORS, Color } from '../styles/palette';
import { root as typographyRoot } from '../Typography/Typography.treat';

export const root = style(({ shape, sizing }) => ({
  display: 'inline-flex',
  padding: `calc(${sizing('small')} / 2) ${sizing('small')}`,
  borderRadius: shape.borderRadius.pill,
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        backgroundColor: palette.lightest(color),
        color: palette[color],
      },
    }),
    {} as Record<Color, Style>,
  ),
}));

Object.entries(colors).forEach(([color, colorClass]) => {
  globalStyle(`${root}${colorClass} ${typographyRoot}`, ({ palette }) => ({
    color: palette[color as Color],
  }));
});
