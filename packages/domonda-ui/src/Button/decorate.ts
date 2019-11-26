import { createStyles, withStyles, WithStyles, TYPOGRAPHY_SIZES, COLORS } from '../styles';
import { fade } from '../styles/colorManipulator';

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
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
    '&$disabled': {
      textDecoration: 'none',
      cursor: 'not-allowed',
    },
  },
  link: {
    textDecoration: 'underline',
  },
  primary: {
    borderRadius: shape.borderRadius.tiny,
    boxShadow: shadows.line,
    '&$disabled': {
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
  },
  secondary: {
    borderRadius: shape.borderRadius.tiny,
    boxShadow: shadows.line,
    backgroundColor: palette.background,
    border: `1px solid ${palette.border}`,
    '&:hover, &:focus': {
      backgroundColor: palette.darken('background', 0.02),
    },
    '&:active': {
      backgroundColor: palette.darken('background', 0.04),
    },
    '&$disabled': {
      cursor: 'not-allowed',
      boxShadow: 'none',
      backgroundColor: palette.darken('background', 0.1),
      border: `1px solid ${palette.darken('background', 0.2)}`,
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
            color: palette.darken(color, 0.05),
          },
          '&:active': {
            color: palette.darken(color, 0.1),
          },
          '& > $label svg:not(:only-child)': {
            color: palette.fade(color, 0.6),
          },
          '&$disabled': {
            color: palette.fade(color, 0.4),
            '& > $label svg:not(:only-child)': {
              color: palette.fade(color, 0.2),
            },
          },
        },
        '&$link': {
          color: palette[color],
          '&:hover': {
            color: palette.darken(color, 0.05),
          },
          '&:active': {
            color: palette.darken(color, 0.1),
          },
          '& > $label svg:not(:only-child)': {
            color: palette.fade(color, 0.6),
          },
          '&$disabled': {
            color: palette.fade(color, 0.4),
            '& > $label svg:not(:only-child)': {
              color: palette.fade(color, 0.2),
            },
          },
        },
        '&$primary': {
          color: palette.contrastText(color),
          backgroundColor: palette[color],
          border: `1px solid ${palette.dark(color)}`,
          '&:hover': {
            backgroundColor: palette.darken(color, 0.05),
          },
          '&:active': {
            backgroundColor: palette.darken(color, 0.1),
          },
          '& > $label svg:not(:only-child)': {
            color: palette.lighten(color, 0.6),
          },
          '&$disabled': {
            color: fade(palette.contrastText(color), 0.6),
            backgroundColor: palette.light(color),
            border: `1px solid ${palette.lighten(color, 0.4)}`,
          },
        },
        '&$secondary': {
          color: palette[color],
          '& > $label svg:not(:only-child)': {
            color: palette.fade(color, 0.6),
          },
          '&$disabled': {
            color: palette.fade(color, 0.4),
            '& > $label svg:not(:only-child)': {
              color: palette.fade(color, 0.2),
            },
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
          height: typography.sizes[size],
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
