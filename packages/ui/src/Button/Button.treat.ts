import { style, styleMap, globalStyle, Style } from '../styles/treat';
import { fade } from '../styles/colorManipulator';
import { COLORS, Color } from '../styles/palette';
import { TYPOGRAPHY_SIZES, TypographySize } from '../styles/typography';

export const root = style(({ transition }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'inline-flex',
  overflow: 'visible',
  width: 'auto',
  padding: 0,
  border: 0,
  outline: 'none',
  margin: 0,
  background: 'transparent',
  lineHeight: '1em',
  textAlign: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: transition.create(['background-color', 'color']),
  webkitAppearance: 'none',
  webkitFontSmoothing: 'inherit',
  mozOsxFontSmoothing: 'inherit',
}));

export const primary = style(({ shadows, shape }) => ({
  borderRadius: shape.borderRadius.tiny,
  boxShadow: shadows.line,
}));

export const secondary = style(({ palette, shadows, shape }) => ({
  border: `1px solid ${palette.border}`,
  borderRadius: shape.borderRadius.tiny,
  boxShadow: shadows.line,
  backgroundColor: palette.background,
  ':active': {
    backgroundColor: palette.darken('background', 0.04),
  },
  selectors: {
    '&:hover, &:focus': {
      backgroundColor: palette.darken('background', 0.02),
    },
  },
}));

export const text = style(() => ({
  selectors: {
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  },
}));

export const link = style(() => ({
  textDecoration: 'underline',
}));

export const disabled = style(({ palette }) => ({
  selectors: {
    [`${primary}&`]: {
      boxShadow: 'none',
      cursor: 'not-allowed',
    },
    [`${secondary}&`]: {
      border: `1px solid ${palette.darken('background', 0.2)}`,
      boxShadow: 'none',
      backgroundColor: palette.darken('background', 0.1),
      cursor: 'not-allowed',
    },
    [`${text}&`]: {
      textDecoration: 'none',
      cursor: 'not-allowed',
    },
  },
}));

export const label = style(() => ({
  alignItems: 'inherit',
  justifyContent: 'inherit',
  display: 'inherit',
  width: '100%',
  textDecoration: 'inherit',
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce<Record<string, Style>>(
    (acc, color) => ({
      ...acc,
      [color]: {
        selectors: {
          [`${primary}&`]: {
            border: `1px solid ${palette.dark(color)}`,
            backgroundColor: palette[color],
            color: palette.contrastText(color),
          },
          [`${primary}&:hover`]: {
            backgroundColor: palette.darken(color, 0.05),
          },
          [`${primary}&:active`]: {
            backgroundColor: palette.darken(color, 0.1),
          },
          [`${primary}${disabled}&`]: {
            border: `1px solid ${palette.lighten(color, 0.4)}`,
            backgroundColor: palette.light(color),
            color: fade(palette.contrastText(color), 0.6),
          },
          [`${secondary}&`]: {
            color: palette[color],
          },
          [`${secondary}${disabled}&`]: {
            color: palette.fade(color, 0.4),
          },
          [`${text}&`]: {
            color: palette[color],
          },
          [`${text}&:hover`]: {
            color: palette.darken(color, 0.05),
          },
          [`${text}&:active`]: {
            color: palette.darken(color, 0.1),
          },
          [`${text}${disabled}&`]: {
            color: palette.fade(color, 0.4),
          },
          [`${link}&`]: {
            color: palette[color],
          },
          [`${link}&:hover`]: {
            color: palette.darken(color, 0.05),
          },
          [`${link}&:active`]: {
            color: palette.darken(color, 0.1),
          },
          [`${link}${disabled}&`]: {
            color: palette.fade(color, 0.4),
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
        ...typography.variant(size, 'semiBold'),
        selectors: {
          [`${primary}&, ${secondary}&`]: {
            padding: `${typography.sizes[size] / 2}px` + ' ' + `${typography.sizes[size]}px`,
          },
        },
      },
    }),
    {},
  ),
}));

// label
globalStyle(`${label} svg`, () => ({
  display: 'inherit',
  color: 'inherit',
  fill: 'currentColor',
}));

// colors
Object.keys(colors).forEach((key) => {
  const className = colors[key as keyof typeof colors];
  const color = key as Color;

  globalStyle(`${className}${primary} > ${label} svg:not(:only-child)`, ({ palette }) => ({
    color: palette.lighten(color, 0.6),
  }));

  globalStyle(`${className}${secondary} > ${label} svg:not(:only-child)`, ({ palette }) => ({
    color: palette.fade(color, 0.6),
  }));

  globalStyle(
    `${className}${secondary}${disabled} > ${label} svg:not(:only-child)`,
    ({ palette }) => ({
      color: palette.fade(color, 0.2),
    }),
  );

  globalStyle(`${className}${text} > ${label} svg:not(:only-child)`, ({ palette }) => ({
    color: palette.fade(color, 0.6),
  }));

  globalStyle(`${className}${text}${disabled} > ${label} svg:not(:only-child)`, ({ palette }) => ({
    color: palette.fade(color, 0.2),
  }));

  globalStyle(`${className}${link} > ${label} svg:not(:only-child)`, ({ palette }) => ({
    color: palette.fade(color, 0.6),
  }));

  globalStyle(`${className}${link}${disabled} > ${label} svg:not(:only-child)`, ({ palette }) => ({
    color: palette.fade(color, 0.2),
  }));
});

// sizes
Object.keys(sizes).forEach((key) => {
  const className = sizes[key as keyof typeof sizes];
  const size = key as TypographySize;

  globalStyle(`${className} > ${label} svg`, ({ typography }) => ({
    height: typography.sizes[size],
  }));

  globalStyle(
    `${className}${primary} > ${label} svg:not(:only-child):first-child, ${className}${secondary} > ${label} svg:not(:only-child):first-child`,
    ({ typography }) => ({
      marginRight: typography.sizes[size],
    }),
  );

  globalStyle(
    `${className}${primary} > ${label} svg:not(:only-child):last-child, ${className}${secondary} > ${label} svg:not(:only-child):last-child`,
    ({ typography }) => ({
      marginLeft: typography.sizes[size],
    }),
  );

  globalStyle(
    `${className}${text} > ${label} svg:not(:only-child):first-child, ${className}${link} > ${label} svg:not(:only-child):first-child`,
    ({ typography }) => ({
      marginRight: `calc(${typography.sizes.tiny}px / 2)`,
    }),
  );

  globalStyle(
    `${className}${text} > ${label} svg:not(:only-child):last-child, ${className}${link} > ${label} svg:not(:only-child):last-child`,
    ({ typography }) => ({
      marginLeft: `calc(${typography.sizes.tiny}px / 2)`,
    }),
  );
});
