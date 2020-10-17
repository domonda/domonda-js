import { style, styleMap, Style } from 'treat';
import { SHADOWS } from '../styles/shadows';

export const root = style(({ palette }) => ({
  backgroundColor: palette.white,
  color: palette.textDark,
}));

export const bordered = style(({ palette }) => ({
  border: `1px solid ${palette.border}`,
}));

export const rounded = style(({ shape }) => ({
  borderRadius: shape.borderRadius.small,
}));

export const shadows = styleMap(({ shadows }) => ({
  ...SHADOWS.reduce<Record<string, Style>>(
    (acc, shadow) => ({
      ...acc,
      [shadow]: {
        boxShadow: shadows[shadow],
      },
    }),
    {},
  ),
}));
