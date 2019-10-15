import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles(({ palette, spacing, shadows, shape }) => ({
  root: {
    padding: spacing(1, 0),
    backgroundColor: palette.surface,
    boxShadow: shadows[2],
    borderRadius: shape.borderRadius,
    overflow: 'auto',
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
