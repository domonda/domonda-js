import { makeCreateStyles, withStyles, WithStyles } from '../styles';
import { FlexProps } from './Flex';

const styles = makeCreateStyles<FlexProps>()(({ spacing }) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  item: {},
  flex: ({ flex }) => ({
    flex: flex,
  }),
  noWrap: {
    flexWrap: 'nowrap',
  },
  direction: ({ direction }) => ({
    flexDirection: direction,
  }),
  justify: ({ justify }) => ({
    justifyContent: justify,
  }),
  align: ({ align }) => ({
    alignItems: align,
  }),
  self: ({ self }) => ({
    alignSelf: self,
    justifySelf: self,
  }),
  spacing: ({ spacing: spacingProp }) => ({
    width: `calc(100% + ${spacing(spacingProp!)})`,
    margin: spacing((spacingProp! / 2) * -1),
    [`& > $item:not(:empty)`]: {
      padding: spacing(spacingProp! / 2),
    },
  }),
  minWidth: ({ minWidth = 0 }) => ({
    minWidth,
  }),
  maxWidth: ({ maxWidth = 0 }) => ({
    maxWidth,
  }),
  fill: ({ spacing: spacingProp }) => {
    if (spacingProp) {
      return {
        width: `calc(100% + ${spacing(spacingProp)})`,
        height: `calc(100% + ${spacing(spacingProp)})`,
      };
    }
    return {
      width: '100%',
      height: '100%',
    };
  },
  overflowing: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    willChange: 'scroll-position',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  },
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
