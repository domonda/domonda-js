import { createStyles, withStyles, WithStyles, TYPOGRAPHY_SIZES, COLORS } from '../styles';

const styles = createStyles(({ typography, palette, shape, shadows, transition }) => ({
  root: {
    // reset
    border: 0,
    margin: 0,
    padding: 0,
    width: 'auto',
    overflow: 'visible',
    textAlign: 'inherit',
    background: 'transparent',
    lineHeight: '1em',
    webkitFontSmoothing: 'inherit',
    mozOsxFontSmoothing: 'inherit',
    webkitAppearance: 'none',
    outline: 'none',
    textDecoration: 'none',
    // ./reset
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:focus': {
      outline: `2px solid ${palette.light('primary')}`,
    },
    '&:active': {
      outline: 'none',
    },
    transition: transition.create(['background-color', 'color']),
  },
  text: {
    color: palette.secondary,
    '&:hover, &:focus': {
      textDecoration: 'underline',
      color: palette.darken('secondary', 0.2),
    },
    '&:active': {
      borderColor: palette.darken('secondary', 0.4),
      color: palette.darken('secondary', 0.4),
    },
    '&$disabled': {
      textDecoration: 'none',
      cursor: 'not-allowed',
      color: palette.fade('secondary', 0.4),
    },
  },
  link: {
    color: palette.secondary,
    textDecoration: 'underline',
    '&:hover, &:focus': {
      color: palette.darken('secondary', 0.2),
    },
    '&:active': {
      borderColor: palette.darken('secondary', 0.4),
      color: palette.darken('secondary', 0.4),
    },
    '&$disabled': {
      cursor: 'not-allowed',
      color: palette.fade('secondary', 0.4),
    },
  },
  primary: {
    borderRadius: shape.borderRadius.tiny,
    boxShadow: shadows.line,
    color: palette.white,
    backgroundColor: palette.accent,
    border: `1px solid ${palette.dark('accent')}`,
    '&:hover, &:focus': {
      backgroundColor: palette.darken('accent', 0.2),
    },
    '&:active': {
      backgroundColor: palette.darken('accent', 0.4),
    },
    '&$disabled': {
      cursor: 'not-allowed',
      boxShadow: 'none',
      color: palette.fade('white', 0.6),
      backgroundColor: palette.light('accent'),
      border: `1px solid ${palette.lighten('accent', 0.4)}`,
    },
  },
  secondary: {
    borderRadius: shape.borderRadius.tiny,
    boxShadow: shadows.line,
    color: palette.accent,
    backgroundColor: palette.background,
    border: `1px solid ${palette.border}`,
    '&:hover, &:focus': {
      backgroundColor: palette.darken('background', 0.04),
    },
    '&:active': {
      backgroundColor: palette.darken('background', 0.08),
    },
    '& > $label svg:not(:only-child)': {
      color: palette.gray40,
    },
    '&$disabled': {
      cursor: 'not-allowed',
      boxShadow: 'none',
      color: palette.fade('accent', 0.4),
      backgroundColor: palette.darken('background', 0.08),
      border: `1px solid ${palette.darken('background', 0.1)}`,
      '& > $label svg:not(:only-child)': {
        color: palette.light('gray40'),
      },
    },
  },
  // color-{color}
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [`color-${color}`]: {
        '&$text': {
          color: palette[color],
          '&:hover': {
            color: palette.darken(color, 0.2),
          },
          '&:active': {
            color: palette.darken(color, 0.4),
          },
          '&$disabled': {
            color: palette.fade(color, 0.4),
          },
        },
        '&$link': {
          color: palette[color],
          '&:hover': {
            color: palette.darken(color, 0.2),
          },
          '&:active': {
            color: palette.darken(color, 0.4),
          },
          '&$disabled': {
            color: palette.fade(color, 0.4),
          },
        },
        '&$primary': {
          backgroundColor: palette[color],
          border: `1px solid ${palette.dark(color)}`,
          '&:hover': {
            backgroundColor: palette.darken(color, 0.2),
          },
          '&:active': {
            backgroundColor: palette.darken(color, 0.4),
          },
          '&$disabled': {
            backgroundColor: palette.light(color),
            border: `1px solid ${palette.lighten(color, 0.4)}`,
          },
        },
        '&$secondary': {
          color: palette[color],
          '&$disabled': {
            color: palette.fade(color, 0.4),
          },
        },
      },
    }),
    {},
  ),
  // size-{size}
  ...TYPOGRAPHY_SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [`size-${size}`]: {
        ...typography.variant(size, 'semiBold'),
        '& > $label svg': {
          height: `calc(${typography.sizes[size]}px + 4px)`,
        },
        '&$text, &$link': {
          '& > $label svg': {
            '&:not(:only-child)': {
              '&:first-child': {
                marginRight: `calc(${typography.sizes.tiny}px / 2)`,
              },
              '&:last-child': {
                marginLeft: `calc(${typography.sizes.tiny}px / 2)`,
              },
            },
          },
        },
        '&$primary, &$secondary': {
          padding: `${typography.sizes[size] / 2}px` + ' ' + `${typography.sizes[size]}px`,
          '& > $label svg': {
            '&:not(:only-child)': {
              '&:first-child': {
                marginRight: typography.sizes[size],
              },
              '&:last-child': {
                marginLeft: typography.sizes[size],
              },
            },
          },
        },
      },
    }),
    {},
  ),
  label: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    textDecoration: 'inherit',
    '& svg': {
      display: 'block',
      color: 'inherit',
      fill: 'currentColor',
    },
  },
  disabled: {},
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
