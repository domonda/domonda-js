import { style, styleMap, Style } from '../styles/treat';
import { COLORS } from '../styles/palette';

export const root = style(({ palette, shape, spacing, typography }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'inline-flex',
  padding: spacing('tiny') - 2,
  borderRadius: shape.borderRadius.pill,
  backgroundColor: palette.accent,
  fontSize: typography.sizes.tiny,
  lineHeight: '50%',
  fontWeight: typography.weights.semiBold,
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
