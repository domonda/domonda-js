import { styleMap } from '../styles/treat';

export const styles = styleMap(({ palette, typography }) => ({
  root: {
    ...typography.variant('tiny', 'medium'),
    letterSpacing: 0.6,
    color: palette.secondary,
  },
  block: {
    display: 'block',
  },
  inline: {
    display: 'inline-flex',
  },
}));
