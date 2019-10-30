import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles(({ palette, spacing, shadows, shape }) => ({
  root: {
    padding: spacing('small', 'none'),
    backgroundColor: palette.surface,
    boxShadow: shadows.doubleLine,
    borderRadius: shape.borderRadius,
    overflow: 'auto',
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
