import { style } from 'treat';

export const loadingContainer = style(({ palette }) => ({
  '@keyframes': {
    '0%': {
      opacity: 0.3,
      color: palette.secondary,
    },
    '50%': {
      opacity: 0.3,
      color: palette.primary,
    },
    '100%': {
      opacity: 0.3,
      color: palette.secondary,
    },
  },
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
}));
