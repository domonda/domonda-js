import { style } from 'treat';

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

export const button = style(({ palette, sizing, transition }) => ({
  alignItems: 'center',
  display: 'flex',
  overflow: 'visible',
  width: 'auto',
  padding: sizing('regular'),
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
  transition: transition.create(['background-color']),
  ':hover': {
    backgroundColor: palette.lightest('accent'),
  },
  ':focus': {
    outline: `${palette.focus} auto 5px`,
  },
  ':active': {
    outline: 'none',
  },
}));

export const labelContent = style({
  flex: 1,
});

export const labelIcon = style(({ sizing }) => ({
  display: 'inline-flex',
  marginLeft: sizing('small'),
}));

export const content = style(({ sizing }) => ({
  padding: sizing('small', 'regular', 'regular', 'regular'),
}));
