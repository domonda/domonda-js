import { styleMap } from '../styles/treat';
import { COLORS, COLOR_PREFIX } from '../styles/palette';

export const styles = styleMap(({ palette, shape, spacing, typography }) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
    borderRadius: shape.borderRadius.pill,
    padding: spacing('tiny') - 2,
    backgroundColor: palette.accent,
    fontSize: typography.sizes.tiny,
    lineHeight: '50%',
    fontWeight: typography.weights.semiBold,
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
}));
