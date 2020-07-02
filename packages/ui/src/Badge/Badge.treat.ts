import { style, styleMap, Style } from 'treat';
import { COLORS, Color } from '../styles/palette';

export const root = style(({ palette, shape, sizing, typography }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'inline-flex',
  padding: sizing('small'),
  borderRadius: shape.borderRadius.pill,
  backgroundColor: palette.accent,
  lineHeight: '50%',
  fontWeight: typography.weights.medium,
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        backgroundColor: palette[color],
        color: palette.getContrastText(palette[color]),
      },
    }),
    {} as Record<Color, Style>,
  ),
}));
