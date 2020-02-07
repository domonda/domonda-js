import { styleMap } from '../styles/treat';
import { COLORS } from '../styles/palette';

export const styles = styleMap(({ palette, shape, spacing, shadows, typography }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: spacing('small', 'medium'),
    borderRadius: shape.borderRadius.small,
    boxShadow: shadows.line,
  },
  message: {
    flex: 1,
    margin: 0,
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.small,
  },
  rightMargin: {
    marginRight: spacing('small'),
  },
  flat: {
    borderRadius: 0,
    boxShadow: 'none',
  },
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        color: palette.contrastText(color),
        backgroundColor: palette[color],
      },
    }),
    {},
  ),
}));
