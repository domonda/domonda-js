import {
  createStyles,
  withStyles,
  WithStyles,
  TYPOGRAPHY_VARIANTS,
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
    gutterBottom: {
      marginBottom: spacing(1),
    },
    // variant-{variant}
    ...TYPOGRAPHY_VARIANTS.reduce(
      (acc, variant) => ({
        ...acc,
        [`variant-${variant}`]: typography[variant],
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
