import { styleMap } from '../styles/treat';
import { COLORS } from '../styles/palette';

export const styles = styleMap(({ palette, shape, spacing }) => ({
  root: {
    display: 'inline-flex',
    borderRadius: shape.borderRadius.pill,
    padding: `${spacing('tiny') / 2}px ${spacing('tiny')}px`,
  },
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        color: palette[color],
        backgroundColor: palette.lightest(color),
      },
    }),
    {},
  ),
}));
