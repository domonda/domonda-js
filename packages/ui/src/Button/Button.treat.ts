import { style, styleMap, globalStyle, Style } from 'treat';
import { fade } from '../styles/colorManipulator';
import { COLORS, Color } from '../styles/palette';
import { SIZES, Size } from '../styles/sizes';
import { root as svgRoot } from '../Svg/Svg.treat';

export const root = style(({ transition, palette }) => ({
  alignItems: 'center',
  display: 'inline-flex',
  overflow: 'visible',
  width: 'auto',
  padding: 0,
  border: 0,
  outline: 'none',
  margin: 0,
  background: 'transparent',
  lineHeight: 1,
  textAlign: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  fontSize: '1em',
  whiteSpace: 'nowrap',
  transition: transition.create(['background-color', 'color']),
  '--webkit-appearance': 'none',
  ':focus': {
    outline: `${palette.focus} auto 5px`,
  },
}));

export const variants = styleMap(({ shape, shadows, palette }) => ({
  primary: {
    borderRadius: shape.borderRadius.small,
    boxShadow: shadows.line,
  },

  secondary: {
    border: `1px solid ${palette.border}`,
    borderRadius: shape.borderRadius.small,
    boxShadow: shadows.line,
    backgroundColor: palette.surface,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: palette.darken('surface', 0.03),
      },
      '&:active': {
        backgroundColor: palette.darken('surface', 0.1),
      },
    },
  },

  naked: {
    borderRadius: shape.borderRadius.small,
  },

  text: {
    selectors: {
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    },
  },

  link: {
    textDecoration: 'underline',
  },
}));

export const disabled = style(({ palette }) => ({
  selectors: {
    [`${variants.primary}&`]: {
      boxShadow: 'none',
      cursor: 'not-allowed',
    },
    [`${variants.secondary}&`]: {
      border: `1px solid ${palette.darken('background', 0.2)}`,
      boxShadow: 'none',
      backgroundColor: palette.darken('background', 0.1),
      cursor: 'not-allowed',
    },
    [`${variants.text}&`]: {
      textDecoration: 'none',
      cursor: 'not-allowed',
    },
  },
}));

export const label = style(({ typography }) => ({
  display: 'inherit',
  position: 'relative',
  alignItems: 'inherit',
  justifyContent: 'inherit',
  width: '100%',
  textDecoration: 'inherit',
  letterSpacing: 0.5,
  lineHeight: 1.125,
  fontWeight: typography.weights.medium,
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        selectors: {
          [`${variants.primary}&`]: {
            border: `1px solid ${palette.dark(color)}`,
            backgroundColor: palette[color],
            color: palette.getContrastText(palette[color]),
          },
          [`${variants.primary}&:hover`]: {
            backgroundColor: palette.lighten(color, 0.1),
          },
          [`${variants.primary}&:active`]: {
            backgroundColor: palette.lighten(color, 0.3),
          },
          [`${variants.primary}${disabled}&`]: {
            border: `1px solid ${palette.lighten(color, 0.4)}`,
            backgroundColor: palette.light(color),
            color: fade(palette.getContrastText(palette[color]), 0.6),
          },
          [`${variants.secondary}&`]: {
            color: palette[color],
          },
          [`${variants.secondary}${disabled}&`]: {
            color: palette.fade(color, 0.4),
          },
          [`${variants.text}&`]: {
            color: palette[color],
          },
          [`${variants.text}&:hover`]: {
            color: palette.darken(color, 0.05),
          },
          [`${variants.text}&:active`]: {
            color: palette.darken(color, 0.1),
          },
          [`${variants.naked}&`]: {
            color: palette[color],
          },
          [`${variants.naked}&:hover`]: {
            backgroundColor: palette.fade(color, 0.2),
          },
          [`${variants.naked}&:active`]: {
            backgroundColor: palette.fade(color, 0.3),
          },
          [`${variants.text}${disabled}&`]: {
            color: palette.fade(color, 0.4),
          },
          [`${variants.link}&`]: {
            color: palette[color],
          },
          [`${variants.link}&:hover`]: {
            color: palette.darken(color, 0.05),
          },
          [`${variants.link}&:active`]: {
            color: palette.darken(color, 0.1),
          },
          [`${variants.link}${disabled}&`]: {
            color: palette.fade(color, 0.4),
          },
        },
      },
    }),
    {} as Record<Color, Style>,
  ),
}));

export const sizes = styleMap(({ sizing }) => ({
  inherit: {
    selectors: {
      [`${label}&`]: {
        fontSize: 'inherit',
      },
      [`${variants.text} > ${label}&, ${variants.link} > ${label}&`]: {
        padding: 0,
      },
    },
  },
  ...SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [size]: {
        selectors: {
          [`${variants.primary}&, ${variants.secondary}&, ${variants.naked}&`]: {
            padding: `calc(${sizing(size)} / 2) 0`,
          },
          [`${label}&`]: {
            padding: sizing('none', size),
            fontSize: sizing(size),
          },
          [`${variants.text} > ${label}&, ${variants.link} > ${label}&`]: {
            padding: 0,
          },
        },
      },
    }),
    {} as Record<Size, Style>,
  ),
}));

export const dense = style(({ sizing }) => ({
  selectors: {
    [`${root}&`]: {
      padding: sizing('tiny'),
    },
    [`${label}&`]: {
      padding: sizing('none', 'tiny'),
    },
  },
}));

// label
globalStyle(`${label} > span`, () => ({
  display: 'inline-flex',
}));

globalStyle(`${label} > span:not(:only-child):first-child`, ({ sizing }) => ({
  marginRight: sizing('small'),
}));

globalStyle(`${label} > span:not(:only-child):last-child`, ({ sizing }) => ({
  marginLeft: sizing('small'),
}));

// label svg auto-style
globalStyle(`${label} > ${svgRoot}`, () => ({
  display: 'inline-flex',
  height: '100%',
}));

Object.entries(sizes).forEach(([size, sizeClass]) => {
  globalStyle(`${label}${sizeClass} > ${svgRoot}`, ({ sizing }) => ({
    height: size === 'inherit' ? 'inherit' : sizing(size as Size),
  }));
});

Object.entries(colors).forEach(([color, colorClass]) => {
  globalStyle(`${root}${colorClass} > ${label} > ${svgRoot}:not(:only-child)`, ({ palette }) => ({
    color: palette.fade(color as Color, 0.6),
  }));

  globalStyle(
    `${root}${variants.primary}${colorClass} > ${label} > ${svgRoot}:not(:only-child)`,
    ({ palette }) => ({
      color: palette.light(color as Color),
    }),
  );

  globalStyle(
    `${root}${colorClass}${disabled} > ${label} > ${svgRoot}:not(:only-child)`,
    ({ palette }) => ({
      color: palette.fade(color as Color, 0.2),
    }),
  );
});
