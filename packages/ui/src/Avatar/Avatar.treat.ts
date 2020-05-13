import { style, styleMap, globalStyle, Style } from '../styles/treat';
import { COLORS } from '../styles/palette';
import { TYPOGRAPHY_SIZES } from '../styles/typography';

export const root = style({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'inline-flex',
  borderRadius: '50%',
});

export const inner = style({
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'inline-flex',
  borderRadius: '50%',
});

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce<Record<string, Style>>(
    (acc, color) => ({
      ...acc,
      [color]: {
        selectors: {
          [`${root}&`]: {
            backgroundColor: palette.lightest(color),
          },
          [`${inner}&`]: {
            backgroundColor: palette[color],
            color: palette.contrastText(color),
          },
        },
      },
    }),
    {},
  ),
}));

export const sizes = styleMap(({ typography }) => ({
  ...TYPOGRAPHY_SIZES.reduce<Record<string, Style>>(
    (acc, size) => ({
      ...acc,
      [size]: {
        selectors: {
          [`${root}&`]: {
            width: typography.sizes[size] * 2,
            height: typography.sizes[size] * 2,
          },
          [`${inner}&`]: {
            width: typography.sizes[size] * 1.4,
            height: typography.sizes[size] * 1.4,
            fontSize: typography.sizes[size] - 4,
          },
        },
      },
    }),
    {},
  ),
}));

// inner
globalStyle(`${inner} svg`, {
  color: 'inherit',
  fill: 'currentColor',
  width: `calc(100% / 1.4 - 4px)`, // 100% inherits the parent width which is set above
});
