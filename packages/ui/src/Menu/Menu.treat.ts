import { style } from 'treat';

export const root = style(({ palette, shadows, shape }) => ({
  overflow: 'auto',
  borderRadius: shape.borderRadius.tiny,
  boxShadow: shadows.doubleLine,
  backgroundColor: palette.white,
}));
