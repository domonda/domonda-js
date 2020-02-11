import { styleMap, globalStyle } from '../styles/treat';

export const styles = styleMap(({ palette, spacing, shadows, shape, typography }) => ({
  root: {
    position: 'relative',
    flexDirection: 'column-reverse', // because we select the `label` using the CSS `+` adjacent sibling selector
    display: 'flex',
    textAlign: 'left',
  },
  select: {
    // reset
    display: 'inherit',
    margin: 0,
    outline: 0,
    boxSizing: 'border-box',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    // ./reset
    boxShadow: shadows.line,
    border: `1px solid ${palette.border}`,
    borderRadius: shape.borderRadius.tiny,
    padding: spacing('tiny') - 2.5,
    paddingRight: spacing('tiny') + 16, // accommodate the icon
    backgroundColor: palette.white,
    cursor: 'pointer',
    ...typography.variant('small'),
    textAlign: 'inherit',
    whiteSpace: 'nowrap',
  },
  label: {},
  icon: {
    position: 'absolute',
    zIndex: 1,
    right: spacing('tiny') + 2,
    bottom: spacing('tiny'),
    alignItems: 'center',
    display: 'flex',
    pointerEvents: 'none',
  },
  dense: {},
  disabled: {},
}));

// select
globalStyle(`${styles.select}${styles.dense}`, ({ spacing, typography }) => ({
  padding: spacing('tiny') / 2 + 0.5,
  paddingRight: spacing('tiny') / 2 + 16, // accommodate the icon
  fontSize: typography.sizes.tiny,
}));

globalStyle(`${styles.select}${styles.disabled}`, ({ palette }) => ({
  boxShadow: 'none',
  backgroundColor: palette.disabled,
  cursor: 'not-allowed',
  color: palette.light('textDark'),
}));

globalStyle(
  `${styles.select}${styles.disabled} + ${styles.label} + ${styles.icon}`,
  ({ palette }) => ({
    color: palette.light('textDark'),
  }),
);

globalStyle(`${styles.select}:invalid`, ({ palette }) => ({
  borderColor: palette.warning,
}));

globalStyle(`${styles.select}:invalid + ${styles.label}`, ({ palette }) => ({
  color: palette.warning,
}));

globalStyle(`${styles.select}:invalid + ${styles.label} + ${styles.icon}`, ({ palette }) => ({
  color: palette.warning,
}));

globalStyle(
  `${styles.select}:hover:not(${styles.disabled}), ${styles.select}:focus`,
  ({ palette }) => ({
    borderColor: palette.dark('border'),
  }),
);

globalStyle(
  `${styles.select}:hover:not(${styles.disabled}):invalid, ${styles.select}:focus:invalid`,
  ({ palette }) => ({
    borderColor: palette.dark('warning'),
  }),
);

// icon
globalStyle(`${styles.icon}${styles.dense}`, ({ spacing }) => ({
  right: spacing('tiny') / 2 + 2,
  bottom: spacing('tiny') / 2 + 2,
}));

globalStyle(`${styles.icon} > svg`, () => ({
  width: 9,
}));
