import { createStyles, withStyles, WithStyles, TYPOGRAPHY_SIZES } from '../styles';

const styles = createStyles(({ typography }) => ({
  root: {
    lineHeight: 0,
    verticalAlign: 'middle',
    '& svg': {
      color: 'inherit',
      fill: 'currentColor',
    },
  },
  // size-{size}
  ...TYPOGRAPHY_SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [`size-${size}`]: {
        '& svg': {
          height: typography.sizes[size],
        },
      },
    }),
    {},
  ),
}));

export type Decorate = WithStyles<typeof styles, true>;

export const decorate = withStyles(styles, { injectTheme: true });
