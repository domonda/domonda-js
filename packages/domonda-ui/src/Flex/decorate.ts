import { createStyles, withStyles, WithStyles } from '../styles';
import { FlexProps } from './Flex';

export const SPACINGS: NonNullable<FlexProps['spacing']>[] = [1, 2, 3, 4];

const styles = createStyles(({ spacing }) => {
  function generateSpacingStyles() {
    return SPACINGS.reduce(
      (acc, value) => ({
        ...acc,
        [`spacing-${value}`]: {
          width: `calc(100% + ${spacing(value)})`,
          margin: spacing((value / 2) * -1),
          [`& > $item:not(:empty)`]: {
            padding: spacing(value / 2),
          },
        },
      }),
      {},
    );
  }

  return {
    ...generateSpacingStyles(),
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
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
    },
  };
});

export type Decorate = WithStyles<typeof styles, true>;

export const decorate = withStyles(styles, { injectTheme: true });
