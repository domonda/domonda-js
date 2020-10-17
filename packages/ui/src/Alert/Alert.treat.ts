import { style, styleMap, Style } from 'treat';
import { COLORS } from '../styles/palette';

export const root = style(({ shadows, shape, sizing }) => ({
  alignItems: 'center',
  display: 'flex',
  padding: sizing('small', 'regular'),
  borderRadius: shape.borderRadius.small,
  boxShadow: shadows.line,
}));

export const flat = style(() => ({
  boxShadow: 'none',
  borderRadius: 0,
}));

export const message = style(() => ({
  flex: 1,
  margin: 0,
}));

export const rightMargin = style(({ sizing }) => ({
  marginRight: sizing('small'),
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce<Record<string, Style>>(
    (acc, color) => ({
      ...acc,
      [color]: {
        selectors: {
          [`${root}&`]: {
            backgroundColor: palette[color],
          },
          [`${message}&`]: {
            color: palette.getContrastText(palette[color]),
          },
        },
      },
    }),
    {},
  ),
}));
