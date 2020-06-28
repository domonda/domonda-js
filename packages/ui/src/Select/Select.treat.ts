import { style, globalStyle } from 'treat';

export const root = style({
  position: 'relative',
  flexDirection: 'column-reverse', // because we select the `label` using the CSS `+` adjacent sibling selector
  display: 'flex',
  textAlign: 'left',
});

export const dense = style({});

export const disabled = style({});

export const select = style(({ palette, shadows, shape, sizing, typography }) => ({
  display: 'inherit',
  boxSizing: 'border-box',
  padding: sizing('tiny') - 2.5,
  paddingRight: sizing('tiny') + 16, // accommodate the icon
  border: `1px solid ${palette.border}`,
  borderRadius: shape.borderRadius.tiny,
  boxShadow: shadows.line,
  outline: 0,
  margin: 0,
  backgroundColor: palette.white,
  ...typography.variant('small'),
  textAlign: 'inherit',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  '--webkit-appearance': 'none',
  MozAppearance: 'none',
  selectors: {
    '&:invalid': {
      borderColor: palette.warning,
    },
    [`&:hover:not(${disabled}), &:focus`]: {
      borderColor: palette.dark('border'),
    },
    [`&:hover:invalid, &:focus:invalid`]: {
      borderColor: palette.dark('warning'),
    },
    [`${dense}&`]: {
      padding: sizing('tiny') / 2 + 0.5,
      paddingRight: sizing('tiny') / 2 + 16, // accommodate the icon
      fontSize: typography.sizes.tiny,
    },
    [`${disabled}&`]: {
      boxShadow: 'none',
      backgroundColor: palette.disabled,
      color: palette.light('textDark'),
      cursor: 'not-allowed',
    },
  },
}));

export const label = style(({ palette }) => ({
  selectors: {
    [`${select}:invalid + &`]: {
      color: palette.warning,
    },
  },
}));

export const icon = style(({ palette, sizing }) => ({
  position: 'absolute',
  zIndex: 1,
  bottom: sizing('tiny'),
  right: sizing('tiny') + 2,
  alignItems: 'center',
  display: 'flex',
  pointerEvents: 'none',
  selectors: {
    [`${dense}&`]: {
      bottom: sizing('tiny') / 2 + 2,
      right: sizing('tiny') / 2 + 2,
    },
    [`${select}:invalid + ${label} + &`]: {
      color: palette.warning,
    },
    [`${select}${disabled} + ${label} + &`]: {
      color: palette.light('textDark'),
    },
  },
}));

// icon
globalStyle(`${icon} > svg`, () => ({
  width: 9,
}));
