import { style, styleMap, Style } from '../styles/treat';
import { COLORS } from '../styles/palette';

export const root = style(({ shadows, shape, spacing }) => ({
  alignItems: 'center',
  display: 'flex',
  padding: spacing('small', 'medium'),
  borderRadius: shape.borderRadius.small,
  boxShadow: shadows.line,
}));

export const flat = style(() => ({
  boxShadow: 'none',
  borderRadius: 0,
}));

export const message = style(({ typography }) => ({
  flex: 1,
  margin: 0,
  fontSize: typography.sizes.small,
  fontWeight: typography.weights.medium,
}));

export const rightMargin = style(({ spacing }) => ({
  marginRight: spacing('small'),
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce<Record<string, Style>>(
    (acc, color) => ({
      ...acc,
      [color]: {
        selectors: {
          [`${root}&`]: {
            backgroundColor: palette[color],
            color: palette.contrastText(color),
          },
        },
      },
    }),
    {},
  ),
}));
