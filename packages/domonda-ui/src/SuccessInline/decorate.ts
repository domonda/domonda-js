import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles(({ palette, shape, spacing }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: shape.borderRadius.small,
    border: `2px solid ${palette.success}`,
    backgroundColor: palette.lighter('success'),
    padding: spacing('tiny', 'small'),
  },
  message: {
    flex: 1,
    whiteSpace: 'normal',
    color: palette.success,
    margin: 0,
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
