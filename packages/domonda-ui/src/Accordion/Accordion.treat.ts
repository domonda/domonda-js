import { style } from '../styles/treat';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
});

export const open = style(({ palette }) => ({
  selectors: {
    [`${root}&`]: {
      borderBottom: `1px solid ${palette.gray08}`,
    },
  },
}));

export const button = style(({ palette, spacing }) => ({
  alignItems: 'center',
  display: 'flex',
  overflow: 'visible',
  width: 'auto',
  padding: spacing('small'),
  border: 0,
  outline: 'none',
  margin: 0,
  background: 'transparent',
  fontSize: 'inherit',
  lineHeight: '1em',
  textAlign: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  webkitFontSmoothing: 'inherit',
  mozOsxFontSmoothing: 'inherit',
  webkitAppearance: 'none',
  ':hover': {
    backgroundColor: palette.lightest('gray08'),
  },
  ':focus': {
    outline: `2px solid ${palette.light('primary')}`,
  },
  ':active': {
    outline: 'none',
  },
}));

export const labelContent = style({
  flex: 1,
});

export const labelIcon = style(({ spacing }) => ({
  marginLeft: spacing('tiny'),
}));

export const content = style(({ spacing }) => ({
  padding: spacing('tiny', 'small', 'small', 'small'),
}));
