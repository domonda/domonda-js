import { styleMap, globalStyle } from '../styles/treat';
import { SPACES, SPACE_PREFIX, Space } from '../styles/spacing';

const core = styleMap(() => ({
  container: {
    flexWrap: 'nowrap',
    display: 'flex',
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
}));

const spaces = styleMap(({ spacing }) => ({
  ...SPACES.reduce(
    (acc, space) => ({
      ...acc,
      [SPACE_PREFIX + space]: {
        margin: (spacing(space) / 2) * -1,
        width: `calc(100% + ${spacing(space)}px)`,
      },
    }),
    {},
  ),
}));

export const styles = { ...core, ...spaces };

Object.keys(spaces).forEach((key) => {
  const className = spaces[key as keyof typeof spaces];
  const space = key.replace(SPACE_PREFIX, '') as Space;

  globalStyle(`${className} > ${core.item}:not(:empty)`, ({ spacing }) => ({
    padding: spacing(space) / 2,
  }));
});
