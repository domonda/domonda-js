import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles(({ palette }) => ({
  '@keyframes blink': {
    '0%': {
      opacity: 0.3,
      color: palette.secondary,
    },
    '50%': {
      opacity: 1,
      color: palette.primary,
    },
    '100%': {
      opacity: 0.3,
      color: palette.secondary,
    },
  },
  loadingContainer: {
    animationName: '$blink',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
