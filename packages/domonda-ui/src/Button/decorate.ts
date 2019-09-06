import { createStyles, withStyles, WithStyles, COLORS } from '../styles';
import { darken, lighten } from '../styles/colorManipulator';
import { svgIconClassName } from '../SvgIcon';

export const SIZES: ('sm' | 'md')[] = ['sm', 'md'];

const styles = createStyles(({ typography, palette, spacing, shape, shadows, transition }) => ({
  root: {
    // resets
    verticalAlign: 'middle',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    padding: spacing(0.5, 1.5),
    outline: 'none',
    margin: 0,
    lineHeight: 1.75,
    cursor: 'pointer',
    transition: transition.create(['background-color', 'color', 'transform', 'box-shadow']),
    WebkitTapHighlightColor: 'transparent',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    /** https://github.com/cssinjs/jss/issues/1087 */
    // '&::-moz-focus-inner': {
    //   borderStyle: 'none', // Remove Firefox dotted outline.
    // },
    // text and font
    ...typography.body,
    fontWeight: typography.weights.semiBold,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    // specifics
    borderRadius: shape.borderRadius,
    [`& .${svgIconClassName}`]: {
      '&:last-child': {
        marginLeft: spacing(0.75),
      },
      '&:first-child': {
        marginRight: spacing(0.75),
      },
      '&:only-child': {
        margin: 0,
      },
    },
    color: palette.contrastText('surface'),
    '&:focus': {
      outline: `3px solid ${palette.light('primary')}`,
    },
    '&:active': {
      outline: 'none',
    },
    '&$disabled': {
      pointerEvents: 'none', // Disable link interactions
      backgroundColor: palette.darker('surface'),
      color: palette.darkest('surface'),
    },
  },
  // size-{size}
  ...SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [`size-${size}`]: {
        fontSize: size === 'md' ? '.875rem' : '.6rem',
      },
    }),
    {},
  ),
  // contained-{color}
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [`contained-${color}`]: {
        backgroundColor: palette[color],
        color: palette.getContrastText(palette[color]),
        boxShadow: shadows[1],
        '&:hover': {
          backgroundColor: darken(palette[color], 0.08),
        },
        '&:active': {
          boxShadow: shadows[3],
          backgroundColor: darken(palette[color], 0.16),
        },
      },
    }),
    {},
  ),
  // outlined-{color}
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [`outlined-${color}`]: {
        color: palette[color],
        border: '1px solid currentColor',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: lighten(palette[color], 0.8),
        },
        '&:active': {
          backgroundColor: lighten(palette[color], 0.6),
        },
      },
    }),
    {},
  ),
  // text-{color}
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [`text-${color}`]: {
        color: palette[color],
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: lighten(palette[color], 0.8),
        },
        '&:active': {
          backgroundColor: lighten(palette[color], 0.6),
        },
        '&$disabled': {
          backgroundColor: 'transparent',
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
  },
  disabled: {},
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
