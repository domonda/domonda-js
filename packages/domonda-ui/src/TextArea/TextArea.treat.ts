import { styleMap, globalStyle } from '../styles/treat';

export const styles = styleMap(({ palette, spacing, shadows, shape, typography }) => ({
  root: {
    position: 'relative',
    flexDirection: 'column-reverse', // because we select the `label` using the CSS `+` adjacent sibling selector
    display: 'flex',
    textAlign: 'left',
  },
  textArea: {
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
  },
  label: {},
  dense: {},
  disabled: {},
}));

// textArea
globalStyle(`${styles.textArea}${styles.dense}`, ({ spacing }) => ({
  padding: spacing('tiny') / 2 + 0.5,
}));

globalStyle(`${styles.textArea}${styles.disabled}`, ({ palette }) => ({
  boxShadow: 'none',
  cursor: 'not-allowed',
  color: palette.lighten('textDark', 0.68),
}));

globalStyle(`${styles.textArea}:invalid`, ({ palette }) => ({
  borderColor: palette.warning,
}));

globalStyle(`${styles.textArea}:invalid + ${styles.label}`, ({ palette }) => ({
  color: palette.warning,
}));

globalStyle(
  `${styles.textArea}:hover:not(${styles.disabled}), ${styles.textArea}:focus`,
  ({ palette }) => ({
    borderColor: palette.dark('border'),
  }),
);

globalStyle(
  `${styles.textArea}:hover:not(${styles.disabled}):invalid, ${styles.textArea}:focus:invalid`,
  ({ palette }) => ({
    borderColor: palette.dark('warning'),
  }),
);

globalStyle(`${styles.textArea}::placeholder`, ({ palette }) => ({
  color: palette.light('textDark'),
}));
