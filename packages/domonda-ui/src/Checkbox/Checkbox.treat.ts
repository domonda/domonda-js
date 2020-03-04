import { style, styleMap, globalStyle, Style } from '../styles/treat';
import { COLORS, Color } from '../styles/palette';
import { TYPOGRAPHY_SIZES, TypographySize } from '../styles/typography';

export const root = style(({ transition }) => ({
  position: 'relative',
  alignItems: 'center',
  display: 'inline-flex',
  transition: transition.create(['color']),
  cursor: 'pointer',
}));

export const unchecked = style({
  alignItems: 'flex-start',
  display: 'flex',
  color: 'inherit',
});

export const checked = style({
  alignItems: 'flex-start',
  display: 'flex',
  color: 'inherit',
});

export const disabled = style({
  selectors: {
    [`${root}&`]: {
      cursor: 'not-allowed',
    },
  },
});

export const label = style(({ spacing }) => ({
  marginLeft: spacing('tiny'),
  color: 'inherit',
  fontSize: 'inherit',
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce<Record<string, Style>>(
    (acc, color) => ({
      ...acc,
      [color]: {
        color: palette[color],
        selectors: {
          [`${disabled}&`]: {
            color: palette.fade(color, 0.4),
          },
          [`&:not(${disabled}):hover`]: {
            color: palette.dark(color),
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
        fontSize: typography.sizes[size],
      },
    }),
    {},
  ),
}));

globalStyle(`${root} > input`, () => ({
  position: 'absolute',
  opacity: 0,
  padding: 0,
  margin: 0,
  cursor: 'pointer',
}));

globalStyle(`${root} > input:checked ~ ${unchecked}`, () => ({
  display: 'none',
}));

globalStyle(`${root} > input:not(:checked) ~ ${checked}`, () => ({
  display: 'none',
}));

// disabled
globalStyle(`${root}${disabled} > input`, () => ({
  cursor: 'not-allowed',
}));

// colors
Object.keys(colors).forEach((key) => {
  const className = colors[key as keyof typeof colors];
  const color = key as Color;

  globalStyle(
    `${className}:not(${disabled}) > input:focus ~ ${unchecked}, ${className} > input:focus ~ ${checked}`,
    ({ palette }) => ({
      outline: `2px solid ${palette.light('primary')}`,
      color: palette.dark(color),
    }),
  );

  globalStyle(`${className}:not(${disabled}) > input:focus ~ ${label}`, ({ palette }) => ({
    color: palette.dark(color),
  }));
});

// sizes
Object.keys(sizes).forEach((key) => {
  const className = sizes[key as keyof typeof sizes];
  const size = key as TypographySize;

  globalStyle(`${className} > input`, ({ typography }) => ({
    width: typography.sizes[size],
    height: typography.sizes[size],
  }));

  globalStyle(
    `${className} > ${unchecked} > svg, ${className} > ${checked} > svg`,
    ({ typography }) => ({
      width: typography.sizes[size],
    }),
  );
});
