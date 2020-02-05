import { styleMap, globalStyle } from '../styles/treat';

export const styles = styleMap(({ typography }) => ({
  root: {
    display: 'flex',
  },
  // size-{size}
  ...Object.keys(typography.sizes).reduce(
    (acc, size) => ({
      ...acc,
      [`size-${size}`]: {
        height: typography.sizes[size as keyof typeof typography.sizes],
      },
    }),
    {},
  ),
}));

globalStyle(`${styles.root} > svg`, {
  height: 'inherit',
  color: 'inherit',
  fill: 'currentColor',
});
