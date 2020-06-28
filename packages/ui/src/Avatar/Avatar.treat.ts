import { style, styleMap, globalStyle, Style } from 'treat';
import { COLORS } from '../styles/palette';
import { SIZES } from '../styles/sizes';

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

export const sizes = styleMap(({ sizing }) => ({
  ...SIZES.reduce<Record<string, Style>>(
    (acc, size) => ({
      ...acc,
      [size]: {
        selectors: {
          [`${root}&`]: {
            width: `calc(${sizing(size)} * 2)`,
            height: `calc(${sizing(size)} * 2)`,
          },
          [`${inner}&`]: {
            width: `calc(${sizing(size)} * 1.4)`,
            height: `calc(${sizing(size)} * 1.4)`,
            fontSize: `calc(${sizing(size)} - 4)`,
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
