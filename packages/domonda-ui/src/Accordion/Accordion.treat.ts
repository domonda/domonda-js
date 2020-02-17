import { styleMap, globalStyle } from '../styles/treat';

export const styles = styleMap(({ spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  open: {},
  button: {
    // reset
    border: 0,
    margin: 0,
    width: 'auto',
    overflow: 'visible',
    textAlign: 'inherit',
    background: 'transparent',
    lineHeight: '1em',
    webkitFontSmoothing: 'inherit',
    mozOsxFontSmoothing: 'inherit',
    webkitAppearance: 'none',
    outline: 'none',
    textDecoration: 'none',
    fontSize: 'inherit',
    // ./reset
    display: 'flex',
    alignItems: 'center',
    padding: spacing('small'),
    cursor: 'pointer',
  },
  labelContent: {
    flex: 1,
  },
  labelIcon: {
    marginLeft: spacing('tiny'),
  },
  content: {
    padding: spacing('tiny', 'small', 'small', 'small'),
  },
}));

// open
globalStyle(`${styles.root}${styles.open}`, ({ palette }) => ({
  borderBottom: `1px solid ${palette.gray08}`,
}));

// button
globalStyle(`${styles.button}:hover`, ({ palette }) => ({
  backgroundColor: palette.lightest('gray08'),
}));

globalStyle(`${styles.button}:focus`, ({ palette }) => ({
  outline: `2px solid ${palette.light('primary')}`,
}));

globalStyle(`${styles.button}:active`, () => ({
  outline: 'none',
}));
