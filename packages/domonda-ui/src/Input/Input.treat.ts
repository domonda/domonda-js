import { style, globalStyle } from '../styles/treat';

export const root = style({
  display: 'flex',
  textAlign: 'left',
  position: 'relative',
  flexDirection: 'column-reverse', // because we select the `label` using the CSS `+` adjacent sibling selector
});

export const naked = style({});

export const dense = style({});

export const disabled = style({});

export const input = style(({ palette, shadows, shape, spacing, typography }) => ({
  display: 'inherit',
  boxSizing: 'border-box',
  border: 0,
  outline: 0,
  margin: 0,
  backgroundColor: 'transparent',
  backgroundClip: 'padding-box',
  color: palette.textDark,
  ...typography.variant('small'),
  textAlign: 'inherit',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  WebkitAppearance: 'none',
  '::placeholder': {
    color: palette.light('textDark'),
  },
  selectors: {
    [`&:not(${naked})`]: {
      padding: spacing('tiny') - 2.5,
      border: `1px solid ${palette.border}`,
      borderRadius: shape.borderRadius.tiny,
      boxShadow: shadows.line,
      backgroundColor: palette.white,
    },
    [`&:invalid`]: {
      borderColor: palette.warning,
    },
    [`&:hover:not(${disabled}), &:focus`]: {
      borderColor: palette.dark('border'),
    },
    [`&:hover:invalid, &:focus:invalid`]: {
      borderColor: palette.dark('warning'),
    },
    [`${dense}&`]: {
      padding: spacing('tiny') / 2 + 0.5,
      fontSize: typography.sizes.tiny,
    },
    [`${disabled}&`]: {
      boxShadow: 'none',
      color: palette.lighten('textDark', 0.68),
      cursor: 'not-allowed',
    },
    [`${disabled}&:not(${naked})`]: {
      backgroundColor: palette.disabled,
    },
  },
}));

export const svg = style(({ palette, typography }) => ({
  selectors: {
    [`${input} ~ &`]: {
      position: 'absolute',
      bottom: typography.sizes['small'] / 2 + 1,
      alignItems: 'flex-start',
      display: 'flex',
      color: palette.gray30,
      pointerEvents: 'none',
    },
    [`${input}${naked} ~ &`]: {
      bottom: typography.sizes['tiny'] / 4,
    },
    [`${input}${dense} ~ &`]: {
      bottom: typography.sizes['tiny'] / 2 + 1,
    },
    [`${input}${naked}${dense} ~ &`]: {
      bottom: typography.sizes['tiny'] / 2,
    },
  },
}));

export const startSvg = style(({ spacing, typography }) => ({
  selectors: {
    [`${input}&`]: {
      paddingLeft: typography.sizes['small'] + spacing('small'),
    },
    [`${input}${naked}&`]: {
      paddingLeft: typography.sizes['small'] + 2,
    },
    [`${input}${dense}&`]: {
      paddingLeft: typography.sizes['tiny'] + spacing('tiny'),
    },
    [`${input} ~ &`]: {
      left: spacing('tiny') + 0.5,
    },
    [`${input}${naked} ~ &`]: {
      left: 0,
    },
    [`${input}${dense} ~ &`]: {
      left: spacing('tiny') / 2 + 0.5,
    },
  },
}));

export const endSvg = style(({ spacing, typography }) => ({
  selectors: {
    [`${input}&`]: {
      paddingRight: typography.sizes['small'] + spacing('small'),
    },
    [`${input}${naked}&`]: {
      paddingRight: typography.sizes['small'] + 2,
    },
    [`${input}${dense}&`]: {
      paddingRight: typography.sizes['tiny'] + spacing('tiny'),
    },
    [`${input} ~ &`]: {
      right: spacing('tiny') + 0.5,
    },
    [`${input}${naked} ~ &`]: {
      right: 0,
    },
    [`${input}${dense} ~ &`]: {
      right: spacing('tiny') / 2 + 0.5,
    },
  },
}));

export const label = style(({ palette }) => ({
  selectors: {
    [`${input}:invalid + &`]: {
      color: palette.warning,
    },
  },
}));

// svgs
globalStyle(`${input} ~ ${startSvg} > svg, ${input} ~ ${endSvg} > svg`, ({ typography }) => ({
  width: typography.sizes['small'],
}));

globalStyle(
  `${input}${naked} ~ ${startSvg} > svg, ${input}${naked} ~ ${endSvg} > svg`,
  ({ typography }) => ({
    width: typography.sizes['tiny'],
  }),
);

globalStyle(
  `${input}${dense} ~ ${startSvg} > svg, ${input}${dense} ~ ${endSvg} > svg`,
  ({ typography }) => ({
    width: typography.sizes['tiny'],
  }),
);
