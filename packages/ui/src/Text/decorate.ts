import {
  createStyles,
  withStyles,
  WithStyles,
  TYPOGRAPHY_SIZES,
  TYPOGRAPHY_WEIGHTS,
  TYPOGRAPHY_FONTS,
} from '../styles';

const styles = createStyles(({ typography, palette, spacing, shape }) => {
  return {
    root: {
      margin: 0,
      color: palette['textDark'],
      fontSize: typography.sizes['small'],
    },
    block: {
      display: 'block',
    },
    inline: {
      display: 'inline',
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
      '&:empty::before': {
        content: '"\\2014"', // &mdash;
        color: palette.light('textDark'),
      },
    },
    contained: {
      padding: spacing('tiny') - 1.5,
      backgroundColor: palette.darken('background', 0.05),
      borderRadius: shape.borderRadius.tiny,
    },
    // size-{size}
    ...TYPOGRAPHY_SIZES.reduce(
      (acc, size) => ({
        ...acc,
        [`size-${size}`]: {
          fontSize: typography.sizes[size],
        },
      }),
      {},
    ),
    // weight-{weight}
    ...TYPOGRAPHY_WEIGHTS.reduce(
      (acc, weight) => ({
        ...acc,
        [`weight-${weight}`]: {
          fontWeight: typography.weights[weight],
        },
      }),
      {},
    ),
    // font-{font}
    ...TYPOGRAPHY_FONTS.reduce(
      (acc, font) => ({
        ...acc,
        [`font-${font}`]: {
          fontFamily: typography.fonts[font],
        },
      }),
      {},
    ),
  };
});

export type Decorate = WithStyles<typeof styles, true>;

export const decorate = withStyles(styles, { injectTheme: true });
