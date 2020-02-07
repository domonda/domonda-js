import { styleMap } from '../styles/treat';
import { COLORS } from '../styles/palette';

export const styles = styleMap(({ palette, shape, spacing, typography }) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing('tiny') - 2,
    borderRadius: shape.borderRadius.pill,
    backgroundColor: palette.accent,
    fontSize: typography.sizes.tiny,
    fontWeight: typography.weights.semiBold,
    lineHeight: '50%',
  },
  ...COLORS.reduce(
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
