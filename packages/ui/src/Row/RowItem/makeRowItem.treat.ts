import { style } from 'treat';

import sharedStyles from '../sharedStyles';

export const root = style(({ palette, shadows, transition }) => ({
  zIndex: 0,
  border: `1px solid ${palette.border}`,
  borderTop: 0,
  backgroundColor: palette.lighten('gray08', 0.8),
  selectors: {
    'a&': {
      boxShadow: 'none',
      color: 'inherit',
      textDecoration: 'inherit',
      cursor: 'pointer',
      transition: transition.create(['box-shadow', 'background-color']),
    },
    'a&:visited': {
      borderBottom: `1px solid ${palette.lighten('secondary', 0.64)}`,
      backgroundColor: palette.lighten('secondary', 0.86),
    },
    'a&:hover, a&:focus': {
      zIndex: 1,
      boxShadow: shadows.line,
      backgroundColor: palette.surface,
    },
    'a&:focus': {
      outline: `${palette.focus} auto 5px`,
    },
    'a&:active': {
      outline: 'none',
    },
    '&:nth-child(even)': {
      backgroundColor: palette.lighten('gray08', 0.5),
    },
  },
}));

export const row = style((theme) => sharedStyles(theme).row);

export const cell = style((theme) => sharedStyles(theme).cell);

export const clickable = style(({ palette, shadows, transition }) => ({
  boxShadow: 'none',
  color: 'inherit',
  textDecoration: 'inherit',
  cursor: 'pointer',
  transition: transition.create(['box-shadow', 'background-color']),
  selectors: {
    '&:hover, &:focus': {
      zIndex: 1,
      boxShadow: shadows.line,
      backgroundColor: palette.surface,
    },
    '&:focus': {
      outline: `${palette.focus} auto 5px`,
    },
    '&:active': {
      outline: 'none',
    },
  },
}));
