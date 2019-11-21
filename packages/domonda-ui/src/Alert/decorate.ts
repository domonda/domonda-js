import { createStyles, withStyles, WithStyles } from '../styles';
import { COLORS } from '../styles/palette';

const styles = createStyles(({ palette, shape, spacing, shadows, typography }) => ({
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
    fontWeight: typography.weights.semiBold,
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

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
