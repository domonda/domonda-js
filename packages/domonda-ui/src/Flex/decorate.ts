import { createStyles, withStyles, WithStyles } from '../styles';
import { SPACES } from '../styles/spacing';

const styles = createStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100%',
  },
  item: {},
  wrap: {
    flexWrap: 'wrap',
  },
  overflowing: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    willChange: 'scroll-position',
    backfaceVisibility: 'hidden',
  },
  zeroMinWidth: {
    minWidth: 0,
  },
  // spacing-{space}
  ...SPACES.reduce(
    (acc, space) => ({
      ...acc,
      [`spacing-${space}`]: {
        width: `calc(100% + ${spacing(space)}px)`,
        margin: (spacing(space) / 2) * -1,
        [`& > $item:not(:empty)`]: {
          padding: spacing(space) / 2,
        },
      },
    }),
    {},
  ),
}));

export type Decorate = WithStyles<typeof styles, true>;

export const decorate = withStyles(styles, { injectTheme: true });
