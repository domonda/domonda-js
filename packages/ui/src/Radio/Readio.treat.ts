import { style, styleMap, globalStyle, Style } from 'treat';
import { COLORS, Color } from '../styles/palette';
import { SIZES, Size } from '../styles/sizes';

export const disabled = style({});

export const root = style(({ transition }) => ({
  position: 'relative',
  alignItems: 'center',
  display: 'inline-flex',
  cursor: 'pointer',
  transition: transition.create(['color']),
  selectors: {
    [`${disabled}&`]: {
      cursor: 'not-allowed',
    },
  },
}));

export const input = style({
  position: 'absolute',
  opacity: 0,
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  selectors: {
    [`${disabled} > &`]: {
      cursor: 'not-allowed',
    },
  },
});

export const unchecked = style({
  alignItems: 'flex-start',
  display: 'flex',
  color: 'inherit',
  selectors: {
    [`${input}:checked ~ &`]: {
      display: 'none',
    },
  },
});

export const checked = style({
  alignItems: 'flex-start',
  display: 'flex',
  color: 'inherit',
  selectors: {
    [`${input}:not(:checked) ~ &`]: {
      display: 'none',
    },
  },
});

export const label = style(({ sizing }) => ({
  marginLeft: sizing('tiny'),
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
          [`&:not(${disabled}):hover`]: {
            color: palette.dark(color),
          },
          [`${disabled}&`]: {
            color: palette.fade(color, 0.4),
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
        fontSize: sizing(size),
      },
    }),
    {},
  ),
}));

// colors
Object.keys(colors).forEach((key) => {
  const className = colors[key as keyof typeof sizes];
  const color = key as Color;

  globalStyle(
    `${className}:not(${disabled}) > ${input}:focus ~ ${unchecked}, ${className} > ${input}:focus ~ ${checked}`,
    ({ palette }) => ({
      outline: `2px solid ${palette.light('primary')}`,
      color: palette.dark(color),
    }),
  );

  globalStyle(`${className}:not(${disabled}) > ${input}:focus ~ ${label}`, ({ palette }) => ({
    color: palette.dark(color),
  }));
});

// sizes
Object.keys(sizes).forEach((key) => {
  const className = sizes[key as keyof typeof sizes];
  const size = key as Size;

  globalStyle(`${className} > ${input}`, ({ sizing }) => ({
    width: sizing(size),
    height: sizing(size),
  }));

  globalStyle(
    `${className} > ${unchecked} > svg, ${className} > ${checked} > svg`,
    ({ sizing }) => ({
      width: sizing(size),
    }),
  );
});
