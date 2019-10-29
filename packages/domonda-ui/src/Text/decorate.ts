import {
  createStyles,
  withStyles,
  WithStyles,
  TYPOGRAPHY_SIZES,
  TYPOGRAPHY_WEIGHTS,
  TYPOGRAPHY_FONTS,
} from '../styles';

const styles = createStyles(({ typography, palette, spacing }) => {
  return {
    root: {
      margin: 0,
      color: palette.textPrimary,
    },
    block: {
      display: 'block',
    },
    inline: {
      display: 'inline',
    },
    wrap: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    gutterBottom: {
      marginBottom: spacing('small'),
    },
    withPlaceholder: {
      '&:empty::before': {
        content: '"\\2014"', // &mdash;
        color: palette.textSecondary,
      },
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
