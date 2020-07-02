import { style, styleMap, Style } from 'treat';
import { Color, COLORS } from '../styles/palette';

export const root = style(({ sizing }) => ({
  position: 'relative',
  display: 'flex',
  width: sizing('huge'),
  height: sizing('huge'),
  justifyContent: 'center',
  alignItems: 'center',
}));

export const outside = style(() => ({
  width: '100%',
  height: '100%',
  animationDirection: 'alternate-reverse',
}));

export const inside = style(({ shadows }) => ({
  width: '60%',
  height: '60%',
  animationDirection: 'alternate',
  boxShadow: shadows.line,
}));

export const box = style(({ shape }) => ({
  '@keyframes': {
    '0%': {
      transform: 'rotate(-5deg)',
    },
    '100%': {
      transform: 'rotate(5deg)',
    },
  },
  borderRadius: shape.borderRadius.small,
  position: 'absolute',
  animationDuration: '.3s',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
}));

export const colors = styleMap(({ palette }) =>
  COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        selectors: {
          [`${outside}&`]: {
            backgroundColor: palette.lighten(color, 0.6),
          },
          [`${inside}&`]: {
            backgroundColor: palette[color],
          },
        },
      },
    }),
    {} as Record<Color, Style>,
  ),
);
