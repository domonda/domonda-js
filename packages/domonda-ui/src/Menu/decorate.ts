import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles(({ palette, shadows, shape }) => ({
  root: {
    backgroundColor: palette.white,
    boxShadow: shadows.doubleLine,
    borderRadius: shape.borderRadius.small,
    overflow: 'auto',
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
