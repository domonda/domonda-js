import { input, endSvg } from '../../src/Input/Input.treat';
import { highlighted, selected } from '../../src/Menu/MenuItem/MenuItem.treat';
import { style, globalStyle } from 'treat';

export const lightPaper = style(() => ({
  border: 0,
  backgroundColor: 'transparent',
}));

// container
export const inlineAutocompleteContainer = style(({ palette, shape }) => ({
  backgroundColor: palette.gray100,
  width: 192,
  borderRadius: shape.borderRadius.small,
  overflow: 'hidden',
}));

// menu item
export const lightMenuItem = style(({ palette, typography }) => ({
  color: palette.gray08,
  fontWeight: typography.weights.medium,
  backgroundColor: 'transparent',
  ':hover': {
    color: palette.white,
    backgroundColor: palette.lighten('gray100', 0.1),
  },
}));

globalStyle(`${lightMenuItem}${highlighted}`, ({ palette }) => ({
  color: palette.white,
  backgroundColor: palette.lighten('gray100', 0.1),
}));

globalStyle(`${lightMenuItem}${selected}`, ({ palette }) => ({
  color: palette.white,
  backgroundColor: palette.darken('gray100', 0.4),
}));

// input
export const inlineAutocompleteInput = style(() => ({}));

globalStyle(`${inlineAutocompleteInput} ${input}`, ({ palette, spacing, typography }) => ({
  padding: spacing('tiny'),
  color: palette.white,
  fontWeight: typography.weights.semiBold,
  backgroundColor: palette.lighten('gray100', 0.2),
}));

globalStyle(`${inlineAutocompleteInput} ${endSvg}`, ({ spacing }) => ({
  bottom: `${spacing('tiny') + 1}px !important`,
  right: `${spacing('tiny')}px !important`,
}));
