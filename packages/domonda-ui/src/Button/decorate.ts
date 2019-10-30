import { createStyles, withStyles, WithStyles, TYPOGRAPHY_SIZES, COLORS } from '../styles';

const styles = createStyles(({ typography, palette, shape, shadows, transition }) => ({
  root: {
    // reset
    display: 'inline-flex',
    border: 0,
    margin: 0,
    padding: 0,
    width: 'auto',
    overflow: 'visible',
    textAlign: 'inherit',
    background: 'transparent',
    /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
    lineHeight: 'normal',
    /* Corrects font smoothing for webkit */
    webkitFontSmoothing: 'inherit',
    mozOsxFontSmoothing: 'inherit',
    /* Corrects inability to style clickable `input` types in iOS */
    webkitAppearance: 'none',
    outline: 'none',
    // ./reset
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
    '&:hover': {
      textDecoration: 'underline',
      color: palette.darken('secondary', 0.2),
    },
    '&:active': {
      color: palette.darken('secondary', 0.4),
    },
  },
  link: {
    color: palette.secondary,
    textDecoration: 'underline',
    '&:hover': {
      color: palette.darken('secondary', 0.2),
    },
    '&:active': {
      color: palette.darken('secondary', 0.4),
    },
  },
  primary: {
    borderRadius: shape.borderRadius.small,
    boxShadow: shadows.line,
    color: palette.white,
    backgroundColor: palette.accent,
    border: `1px solid ${palette.dark('accent')}`,
    '&:hover': {
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
    borderRadius: shape.borderRadius.small,
    boxShadow: shadows.line,
    color: palette.accent,
    backgroundColor: palette.background,
    border: `1px solid ${palette.border}`,
    '&:hover': {
      backgroundColor: palette.darken('background', 0.04),
    },
    '&:active': {
      backgroundColor: palette.darken('background', 0.08),
    },
    '&$disabled': {
      cursor: 'not-allowed',
      boxShadow: 'none',
      color: palette.fade('accent', 0.4),
      backgroundColor: palette.darken('background', 0.04),
      border: `1px solid ${palette.darken('background', 0.06)}`,
    },
  },
  // size-{size}
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
        },
        '&$link': {
          color: palette[color],
          '&:hover': {
            color: palette.darken(color, 0.2),
          },
          '&:active': {
            color: palette.darken(color, 0.4),
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
  // color-{color}
  ...TYPOGRAPHY_SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [`size-${size}`]: {
        ...typography.variant(size, 'semiBold'),
        '& > $label svg': {
          width: typography.sizes[size],
        },
        '&$primary, &$secondary': {
          padding:
            `calc(${typography.sizes[size]}px / 2 + 1px)` +
            ' ' +
            `calc(${typography.sizes[size]}px + 1px)`,
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
    },
  },
  disabled: {},
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
