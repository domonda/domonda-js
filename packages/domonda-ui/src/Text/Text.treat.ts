import { styleMap } from '../styles/treat';

export const styles = styleMap(({ typography, palette, spacing, shape }) => ({
  root: {
    margin: 0,
    color: palette['textDark'],
    fontSize: typography.sizes['small'],
  },
  block: {
    display: 'block',
  },
  inline: {
    display: 'inline-flex',
  },
  inherit: {
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    fontFamily: 'inherit',
  },
  wrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  gutterBottom: {
    marginTop: 0,
    marginBottom: spacing('tiny'),
  },
  withPlaceholder: {
    selectors: {
      '&:empty::before': {
        content: '"\\2014"', // &mdash;
        color: palette.light('textDark'),
      },
    },
  },
  contained: {
    padding: spacing('tiny') - 1.5,
    backgroundColor: palette.darken('background', 0.05),
    borderRadius: shape.borderRadius.tiny,
  },
  // size-{size}
  ...Object.keys(typography.sizes).reduce(
    (acc, size) => ({
      ...acc,
      [`size-${size}`]: {
        fontSize: typography.sizes[size as keyof typeof typography.sizes],
      },
    }),
    {},
  ),
  // weight-{weight}
  ...Object.keys(typography.weights).reduce(
    (acc, weight) => ({
      ...acc,
      [`weight-${weight}`]: {
        fontWeight: typography.weights[weight as keyof typeof typography.weights],
      },
    }),
    {},
  ),
  // font-{font}
  ...Object.keys(typography.fonts).reduce(
    (acc, font) => ({
      ...acc,
      [`font-${font}`]: {
        fontFamily: typography.fonts[font as keyof typeof typography.fonts],
      },
    }),
    {},
  ),
}));
