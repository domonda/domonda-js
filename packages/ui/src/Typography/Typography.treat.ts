import { style, styleMap, Style } from 'treat';
import { COLORS, Color } from '../styles/palette';
import { SIZES, Size } from '../styles/sizes';

export const root = style(({ palette }) => ({
  marginTop: 0,
  lineHeight: 1.125,
  color: palette.text,
}));

export const variants = styleMap(({ sizing, typography, palette }) => ({
  h1: {
    color: palette.text,
    fontFamily: typography.fonts.header,
    fontWeight: typography.weights.bold,
    marginBottom: sizing('regular'),
  },
  h2: {
    color: palette.text,
    fontFamily: typography.fonts.header,
    fontWeight: typography.weights.bold,
    marginBottom: sizing('regular'),
  },
  h3: {
    color: palette.text,
    fontFamily: typography.fonts.header,
    fontWeight: typography.weights.medium,
    marginBottom: sizing('regular'),
  },
  h4: {
    color: palette.text,
    fontFamily: typography.fonts.header,
    fontWeight: typography.weights.medium,
    marginBottom: sizing('regular'),
  },
  h5: {
    color: palette.text,
    fontFamily: typography.fonts.header,
    fontWeight: typography.weights.medium,
    marginBottom: sizing('regular'),
  },
  h6: {
    color: palette.text,
    fontFamily: typography.fonts.header,
    fontWeight: typography.weights.medium,
    marginBottom: sizing('regular'),
  },
  p: {
    color: palette.text,
    fontFamily: typography.fonts.body,
    fontWeight: typography.weights.regular,
    fontSize: '1em',
    marginBottom: sizing('regular'),
    lineHeight: 1.5,
  },
  label: {
    color: palette.secondary,
    fontFamily: typography.fonts.body,
    fontSize: '0.75em',
    fontWeight: typography.weights.medium,
    letterSpacing: 0.6,
    lineHeight: 1.5,
  },
  small: {
    color: palette.text,
    fontFamily: typography.fonts.body,
  },
  pre: {
    color: palette.text,
  },
  var: {
    fontFamily: typography.fonts.body,
    fontStyle: 'normal',
  },
}));

export const block = style(() => ({
  display: 'block',
}));

export const inline = style(() => ({
  display: 'inline',
}));

export const inherit = style(() => ({
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
}));

export const wrap = style(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const contained = style(({ palette, shape, sizing }) => ({
  margin: 0,
  padding: sizing('small'),
  borderRadius: shape.borderRadius.tiny,
  backgroundColor: palette.darken('background', 0.05),
}));

export const noBottomGutter = style(() => ({
  marginBottom: 0,
}));

export const bottomGutter = styleMap(({ sizing }) =>
  SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [size]: {
        marginBottom: sizing(size),
      },
    }),
    {} as Record<Size, Style>,
  ),
);

export const colors = styleMap(({ palette }) =>
  COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        color: palette[color],
      },
    }),
    {} as Record<Color, Style>,
  ),
);
