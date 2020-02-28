import { style, globalStyle } from '../styles/treat';

export const root = style({
  position: 'relative',
  flexDirection: 'column-reverse', // because we select the `label` using the CSS `+` adjacent sibling selector
  display: 'flex',
  textAlign: 'left',
});

export const textArea = style(({ palette, spacing, shadows, shape, typography }) => ({
  // reset
  display: 'inherit',
  margin: 0,
  outline: 0,
  boxSizing: 'border-box',
  backgroundClip: 'padding-box',
  whiteSpace: 'nowrap',
  WebkitAppearance: 'none',
  // ./reset
  boxShadow: shadows.line,
  border: `1px solid ${palette.border}`,
  borderRadius: shape.borderRadius.tiny,
  minWidth: 256,
  minHeight: spacing('tiny') * 6,
  padding: spacing('tiny') - 2.5,
  backgroundColor: palette.white,
  ...typography.variant('small'),
  textAlign: 'inherit',
  color: palette.textDark,
  ':invalid': {
    borderColor: palette.warning,
  },
  '::placeholder': {
    color: palette.light('textDark'),
  },
}));

export const label = style(({ palette }) => ({
  selectors: {
    [`${textArea}:invalid + &`]: {
      color: palette.warning,
    },
  },
}));

export const dense = style(({ spacing }) => ({
  selectors: {
    [`${textArea}&`]: {
      padding: spacing('tiny') / 2 + 0.5,
    },
  },
}));

export const disabled = style(({ palette }) => ({
  selectors: {
    [`${textArea}&`]: {
      boxShadow: 'none',
      cursor: 'not-allowed',
      color: palette.lighten('textDark', 0.68),
    },
  },
}));

globalStyle(`${textArea}:hover:not(${disabled}), ${textArea}:focus`, ({ palette }) => ({
  borderColor: palette.dark('border'),
}));

globalStyle(
  `${textArea}:hover:not(${disabled}):invalid, ${textArea}:focus:invalid`,
  ({ palette }) => ({
    borderColor: palette.dark('warning'),
  }),
);
