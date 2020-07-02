import { style, styleMap, globalStyle, Style } from 'treat';
import { COLORS } from '../styles/palette';
import { SIZES } from '../styles/sizes';
import { root as svgRoot } from '../Svg/Svg.treat';

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
            color: palette.getContrastText(palette[color]),
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
            width: `calc(${sizing(size)} * 1.5)`,
            height: `calc(${sizing(size)} * 1.5)`,
          },
          [`${inner}&`]: {
            width: '75%',
            height: '75%',
          },
        },
      },
    }),
    {},
  ),
}));

// inner
globalStyle(`${inner} > ${svgRoot}`, {
  color: 'inherit',
  fill: 'currentColor',
  height: '65%',
});
