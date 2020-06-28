import { style, styleMap, Style } from 'treat';
import { COLORS } from '../styles/palette';

export const root = style(({ palette, shape, sizing, typography }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'inline-flex',
  padding: sizing('tiny') - 2,
  borderRadius: shape.borderRadius.pill,
  backgroundColor: palette.accent,
  fontSize: typography.sizes.tiny,
  lineHeight: '50%',
  fontWeight: typography.weights.bold,
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce<Record<string, Style>>(
    (acc, color) => ({
      ...acc,
      [color]: {
        backgroundColor: palette[color],
        color: palette.contrastText(color),
      },
    }),
    {},
  ),
}));
