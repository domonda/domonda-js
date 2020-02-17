import { styleMap, globalStyle } from '../styles/treat';
import { COLORS, COLOR_PREFIX, Color } from '../styles/palette';
import { TYPOGRAPHY_SIZES, TYPOGRAPHY_SIZE_PREFIX, TypographySize } from '../styles/typography';

const core = styleMap(() => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
    borderRadius: '50%',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
    borderRadius: '50%',
  },
}));

const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [COLOR_PREFIX + color]: {
        backgroundColor: palette.lightest(color),
      },
    }),
    {},
  ),
}));

const sizes = styleMap(({ typography }) => ({
  ...TYPOGRAPHY_SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [TYPOGRAPHY_SIZE_PREFIX + size]: {
        width: typography.sizes[size] * 2,
        height: typography.sizes[size] * 2,
      },
    }),
    {},
  ),
}));

export const styles = { ...core, ...colors, ...sizes };

// inner
globalStyle(`${core.inner} svg`, () => ({
  color: 'inherit',
  fill: 'currentColor',
}));

// colors
Object.keys(colors).forEach((key) => {
  const className = colors[key as keyof typeof colors];
  const color = key.replace(COLOR_PREFIX, '') as Color;

  globalStyle(`${className} > ${core.inner}`, ({ palette }) => ({
    backgroundColor: palette[color],
    color: palette.contrastText(color),
  }));
});

// sizes
Object.keys(sizes).forEach((key) => {
  const className = sizes[key as keyof typeof sizes];
  const size = key.replace(TYPOGRAPHY_SIZE_PREFIX, '') as TypographySize;

  globalStyle(`${className} > ${core.inner}`, ({ typography }) => ({
    width: typography.sizes[size] * 1.4,
    height: typography.sizes[size] * 1.4,
    fontSize: typography.sizes[size] - 4,
  }));

  globalStyle(`${className} > ${core.inner} svg`, ({ typography }) => ({
    width: typography.sizes[size] - 4,
  }));
});
