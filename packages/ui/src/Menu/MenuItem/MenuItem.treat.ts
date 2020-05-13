import { style } from '../../styles/treat';

export const root = style(({ palette, spacing, transition, typography }) => ({
  alignItems: 'center',
  display: 'inline-flex',
  width: '100%',
  padding: spacing('tiny'),
  borderBottom: '3px solid transparent',
  color: palette.textDark,
  ...typography.variant('small'),
  textDecoration: 'none',
  transition: transition.create(['color', 'background-color']),
  selectors: {
    'a&': {
      cursor: 'pointer',
    },
    'a&:hover, a&:focus': {
      backgroundColor: palette.lightest('primary'),
      color: palette.primary,
    },
    'a&:focus': {
      outline: `3px solid ${palette.light('primary')}`,
    },
    'a&:active': {
      outline: 'none',
      backgroundColor: palette.lighten('primary', 0.85),
      color: palette.dark('primary'),
    },
  },
}));

export const clickable = style(({ palette }) => ({
  cursor: 'pointer',
  selectors: {
    '&:hover, &:focus': {
      backgroundColor: palette.lightest('primary'),
      color: palette.primary,
    },
    '&:focus': {
      outline: `3px solid ${palette.light('primary')}`,
    },
    '&:active': {
      outline: 'none',
      color: palette.dark('primary'),
      backgroundColor: palette.lighten('primary', 0.85),
    },
  },
}));

export const highlighted = style(({ palette }) => ({
  backgroundColor: palette.lightest('primary'),
  color: palette.primary,
}));

export const selected = style(({ palette }) => ({
  backgroundColor: palette.lightest('secondary'),
  color: palette.secondary,
}));

export const disabled = style(({ palette }) => ({
  backgroundColor: palette.disabled,
  color: palette.light('textDark'),
  pointerEvents: 'none',
}));

export const text = style({
  display: 'inline-flex',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
