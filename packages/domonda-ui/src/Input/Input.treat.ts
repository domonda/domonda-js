import { styleMap, globalStyle } from '../styles/treat';

export const styles = styleMap(({ typography, palette }) => ({
  root: {
    display: 'flex',
    textAlign: 'left',
    position: 'relative',
    flexDirection: 'column-reverse', // because we select the `label` using the CSS `+` adjacent sibling selector
  },
  input: {
    // reset
    margin: 0,
    display: 'inherit',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    outline: 0,
    border: 0,
    backgroundColor: 'transparent',
    textOverflow: 'ellipsis',
    backgroundClip: 'padding-box',
    WebkitAppearance: 'none',
    // ./reset
    ...typography.variant('small'),
    textAlign: 'inherit',
    color: palette.textDark,
    '::placeholder': {
      color: palette.light('textDark'),
    },
  },
  label: {},
  dense: {},
  naked: {},
  startSvg: {},
  endSvg: {},
  disabled: {},
}));

// hover, focus
globalStyle(
  `${styles.input}:hover:not(${styles.disabled}), ${styles.input}:focus`,
  ({ palette }) => ({
    borderColor: palette.dark('border'),
  }),
);

// disabled
globalStyle(`${styles.input}${styles.disabled}`, ({ palette }) => ({
  cursor: 'not-allowed',
  color: palette.lighten('textDark', 0.68),
  boxShadow: 'none',
}));

// invalid
const invalid = `${styles.input}:invalid`;
globalStyle(`${invalid}:not(${styles.naked})`, ({ palette }) => ({
  borderColor: palette.warning,
}));
globalStyle(`${invalid} + ${styles.label}`, ({ palette }) => ({
  color: palette.warning,
}));
globalStyle(`${invalid}:hover, ${invalid}:focus`, ({ palette }) => ({
  borderColor: palette.dark('warning'),
}));

// naked
const notNaked = `${styles.input}:not(${styles.naked})`;
globalStyle(notNaked, ({ palette, shape, shadows, spacing }) => ({
  backgroundColor: palette.white,
  border: `1px solid ${palette.border}`,
  borderRadius: shape.borderRadius.tiny,
  boxShadow: shadows.line,
  padding: spacing('tiny') - 2.5,
}));
// not naked disabled
globalStyle(`${notNaked}${styles.disabled}`, ({ palette }) => ({
  backgroundColor: palette.disabled,
}));

// dense
globalStyle(`${styles.input}${styles.dense}`, ({ typography, spacing }) => ({
  fontSize: typography.sizes.tiny,
  padding: spacing('tiny') / 2 + 0.5,
}));

// svgs
const hasStartSvg = `${styles.input}${styles.startSvg}`;
const startSvgSibling = `${styles.input} ~ ${styles.startSvg}`;
const hasEndSvg = `${styles.input}${styles.endSvg}`;
const endSvgSibling = `${styles.input} ~ ${styles.endSvg}`;
globalStyle(`${startSvgSibling}, ${endSvgSibling}`, ({ palette, typography }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  position: 'absolute',
  pointerEvents: 'none',
  color: palette.gray30,
  bottom: typography.sizes['small'] / 2 + 1,
}));
globalStyle(`${startSvgSibling} > svg, ${endSvgSibling} > svg`, ({ typography }) => ({
  width: typography.sizes['small'],
}));
// naked
globalStyle(
  `${styles.naked}${startSvgSibling}, ${styles.naked}${endSvgSibling}`,
  ({ typography }) => ({
    bottom: typography.sizes['tiny'] / 4,
  }),
);
globalStyle(
  `${styles.naked}${startSvgSibling} > svg, ${styles.naked}${endSvgSibling} > svg`,
  ({ typography }) => ({
    width: typography.sizes['tiny'],
  }),
);
// dense
globalStyle(
  `${styles.dense}${startSvgSibling}, ${styles.dense}${endSvgSibling}`,
  ({ typography }) => ({
    bottom: typography.sizes['tiny'] / 2 + 1,
  }),
);
globalStyle(
  `${styles.dense}${startSvgSibling} > svg, ${styles.dense}${endSvgSibling} > svg`,
  ({ typography }) => ({
    width: typography.sizes['tiny'],
  }),
);
// naked and dense
globalStyle(
  `${styles.naked}${styles.dense}${startSvgSibling}, ${styles.naked}${styles.dense}${endSvgSibling}`,
  ({ typography }) => ({
    bottom: typography.sizes['tiny'] / 2,
  }),
);
// start svg
globalStyle(hasStartSvg, ({ typography, spacing }) => ({
  paddingLeft: typography.sizes['small'] + spacing('small'),
}));
globalStyle(`${styles.naked}${hasStartSvg}`, ({ typography }) => ({
  paddingLeft: typography.sizes['small'] + 2,
}));
globalStyle(`${styles.naked}${startSvgSibling}`, {
  left: 0,
});
globalStyle(`${styles.dense}${hasStartSvg}`, ({ typography, spacing }) => ({
  paddingLeft: typography.sizes['tiny'] + spacing('tiny'),
}));
globalStyle(startSvgSibling, ({ spacing }) => ({
  left: spacing('tiny') + 0.5,
}));
globalStyle(`${styles.dense}${startSvgSibling}`, ({ spacing }) => ({
  left: spacing('tiny') / 2 + 0.5,
}));
// end svg
globalStyle(hasEndSvg, ({ typography, spacing }) => ({
  paddingRight: typography.sizes['small'] + spacing('small'),
}));
globalStyle(`${styles.naked}${hasEndSvg}`, ({ typography }) => ({
  paddingRight: typography.sizes['small'] + 2,
}));
globalStyle(`${styles.naked}${endSvgSibling}`, {
  right: 0,
});
globalStyle(`${styles.dense}${hasEndSvg}`, ({ typography, spacing }) => ({
  paddingRight: typography.sizes['tiny'] + spacing('tiny'),
}));
globalStyle(endSvgSibling, ({ spacing }) => ({
  right: spacing('tiny') + 0.5,
}));
globalStyle(`${styles.dense}${endSvgSibling}`, ({ spacing }) => ({
  right: spacing('tiny') / 2 + 0.5,
}));
