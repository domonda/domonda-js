import { style, styleMap, Style } from 'treat';
import { SIZES, Size } from '../styles/sizes';

export const root = style({
  display: 'inline-flex',
  fill: 'currentColor',
});

export const sizes = styleMap(({ sizing }) => ({
  ...SIZES.reduce((acc, size) => {
    return {
      ...acc,
      [size]: {
        height: sizing(size as Size),
      },
    };
  }, {} as Record<Size, Style>),
}));
