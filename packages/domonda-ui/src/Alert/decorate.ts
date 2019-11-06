import { createStyles, withStyles, WithStyles } from '../styles';
import { COLORS } from '../styles/palette';

const styles = createStyles(({ palette, shape, spacing, shadows }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: spacing('tiny', 'small'),
    borderRadius: shape.borderRadius.small,
    boxShadow: shadows.line,
  },
  message: {
    flex: 1,
    margin: 0,
  },
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        color: palette[color],
        border: `1px solid currentColor`,
        backgroundColor: palette.lightest(color),
      },
    }),
    {},
  ),
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
