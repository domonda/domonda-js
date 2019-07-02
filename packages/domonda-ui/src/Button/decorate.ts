import { makeCreateStyles, withStyles, WithStyles, Color } from '../styles';
import { darken, lighten } from '../styles/colorManipulator';
import { ButtonProps } from './Button';
import { svgIconClassName } from '../SvgIcon';

const styles = makeCreateStyles<ButtonProps>()(
  ({ typography, palette, spacing, shape, shadows, transition }) => ({
    root: {
      // resets
      verticalAlign: 'middle',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      padding: spacing(0.5, 1.5),
      WebkitTapHighlightColor: 'transparent',
      outline: 'none',
      margin: 0,
      lineHeight: 1.75,
      cursor: 'pointer',
      transition: transition.create(['background-color', 'color', 'transform', 'box-shadow']),
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
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
    size: ({ size = 'md' }) => ({
      fontSize: size === 'md' ? '.875rem' : '.6rem',
    }),
    contained: ({ color = 'surface', colorVariant }) => {
      const manipulator = colorVariant ? palette[colorVariant] : (color: Color) => palette[color];
      return {
        backgroundColor: manipulator(color),
        color: palette.getContrastText(manipulator(color)),
        boxShadow: shadows[1],
        '&:hover': {
          backgroundColor: darken(manipulator(color), 0.08),
        },
        '&:active': {
          boxShadow: shadows[3],
          backgroundColor: darken(manipulator(color), 0.16),
        },
      };
    },
    outlined: ({ color = 'default', colorVariant }) => {
      const manipulator = colorVariant ? palette[colorVariant] : (color: Color) => palette[color];
      return {
        color: manipulator(color),
        border: '1px solid currentColor',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: lighten(manipulator(color), 0.8),
        },
        '&:active': {
          backgroundColor: lighten(manipulator(color), 0.6),
        },
      };
    },
    text: ({ color = 'default', colorVariant }) => {
      const manipulator = colorVariant ? palette[colorVariant] : (color: Color) => palette[color];
      return {
        color: manipulator(color),
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: lighten(manipulator(color), 0.8),
        },
        '&:active': {
          backgroundColor: lighten(manipulator(color), 0.6),
        },
        '&$disabled': {
          backgroundColor: 'transparent',
        },
      };
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
    disabled: {},
  }),
);

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
