import { style, styleMap, Style } from '../styles/treat';
import { COLORS } from '../styles/palette';

export const root = style(({ shape, spacing }) => ({
  display: 'inline-flex',
  padding: `${spacing('tiny') / 2}px ${spacing('tiny')}px`,
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
