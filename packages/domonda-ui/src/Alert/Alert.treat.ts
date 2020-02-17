import { styleMap } from '../styles/treat';
import { COLORS, COLOR_PREFIX } from '../styles/palette';

export const styles = styleMap(({ palette, shape, spacing, shadows, typography }) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    boxShadow: shadows.line,
    borderRadius: shape.borderRadius.small,
    padding: spacing('small', 'medium'),
  },
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [COLOR_PREFIX + color]: {
        backgroundColor: palette[color],
        color: palette.contrastText(color),
      },
    }),
    {},
  ),
  flat: {
    boxShadow: 'none',
    borderRadius: 0,
  },
  message: {
    flex: 1,
    margin: 0,
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.medium,
  },
  rightMargin: {
    marginRight: spacing('small'),
  },
}));
