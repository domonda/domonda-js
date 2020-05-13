import { style, styleMap, Style } from '../styles/treat';

export const root = style(({ palette, typography }) => ({
  margin: 0,
  color: palette['textDark'],
  fontSize: typography.sizes['small'],
}));

export const block = style(() => ({
  display: 'block',
}));

export const inline = style(() => ({
  display: 'inline',
}));

export const inherit = style(() => ({
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
}));

export const wrap = style(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const gutterBottom = style(({ spacing }) => ({
  marginTop: 0,
  marginBottom: spacing('tiny'),
}));

export const withPlaceholder = style(({ palette }) => ({
  selectors: {
    '&:empty::before': {
      content: '"\\2014"', // &mdash;
      color: palette.light('textDark'),
    },
  },
}));

export const contained = style(({ palette, shape, spacing }) => ({
  padding: spacing('tiny') - 1.5,
  borderRadius: shape.borderRadius.tiny,
  backgroundColor: palette.darken('background', 0.05),
}));

export const fonts = styleMap(({ typography: { fonts } }) => ({
  ...Object.keys(fonts).reduce<Record<string, Style>>(
    (acc, font) => ({
      ...acc,
      [font]: {
        fontFamily: fonts[font as keyof typeof fonts],
      },
    }),
    {},
  ),
}));

export const sizes = styleMap(({ typography: { sizes } }) => ({
  ...Object.keys(sizes).reduce<Record<string, Style>>(
    (acc, size) => ({
      ...acc,
      [size]: {
        fontSize: sizes[size as keyof typeof sizes],
      },
    }),
    {},
  ),
}));

export const weights = styleMap(({ typography: { weights } }) => ({
  ...Object.keys(weights).reduce<Record<string, Style>>(
    (acc, weight) => ({
      ...acc,
      [weight]: {
        fontWeight: weights[weight as keyof typeof weights],
      },
    }),
    {},
  ),
}));
