import { style, styleMap, Style } from 'treat';
import { COLORS } from '../styles/palette';

export const root = style(({ shape, sizing }) => ({
  display: 'inline-flex',
  padding: `${sizing('tiny') / 2}px ${sizing('tiny')}px`,
  borderRadius: shape.borderRadius.pill,
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce<Record<string, Style>>(
    (acc, color) => ({
      ...acc,
      [color]: {
        backgroundColor: palette.lightest(color),
        color: palette[color],
      },
    }),
    {},
  ),
}));
