import { createStyles, withStyles, WithStyles } from '../styles';
import { SPACES } from '../styles/spacing';

const styles = createStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  item: {},
  noWrap: {
    flexWrap: 'nowrap',
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
        width: `calc(100% + ${spacing(space)})`,
        margin: `calc(${spacing(space)} / 2 * -1)`,
        [`& > $item:not(:empty)`]: {
          padding: `calc(${spacing(space)} / 2)`,
        },
      },
    }),
    {},
  ),
}));

export type Decorate = WithStyles<typeof styles, true>;

export const decorate = withStyles(styles, { injectTheme: true });
