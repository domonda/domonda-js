import { style } from 'treat';

export const root = style(({ palette, typography }) => ({
  color: palette.secondary,
  ...typography.variant('tiny', 'medium'),
  letterSpacing: 0.6,
}));

export const block = style(() => ({
  display: 'block',
}));

export const inline = style(() => ({
  display: 'inline-flex',
}));
