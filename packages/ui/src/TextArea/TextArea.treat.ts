import { style, styleMap } from 'treat';

export const root = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

export const label = style(() => ({}));

export const textArea = styleMap(({ palette, sizing, shape, typography }) => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderRadius: shape.borderRadius.small,
    border: `1px solid ${palette.border}`,
  },
  root: {
    flex: 1,
    border: 0,
    outline: 0,
    margin: 0,
    backgroundColor: 'transparent',
    backgroundClip: 'padding-box',
    color: palette.text,
    padding: sizing('small'),
    ...typography.variant('regular'),
    textAlign: 'inherit',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '--webkit-appearance': 'none',
    '::placeholder': {
      color: palette.light('text'),
    },
    minWidth: 256,
    minHeight: sizing('large'),
  },
}));

export const dense = style(({ sizing }) => ({
  selectors: {
    [`${label}&`]: {
      lineHeight: 1.125,
    },
    [`${textArea.root}&`]: {
      padding: sizing('tiny'),
    },
  },
}));

export const disabled = style(({ palette }) => ({
  selectors: {
    [`${textArea.container}&`]: {
      cursor: 'not-allowed',
      backgroundColor: palette.disabled,
    },
  },
}));

export const invalid = style(({ palette }) => ({
  selectors: {
    [`${textArea.container}&`]: {
      borderColor: palette.warning,
    },
    [`${textArea.root}&`]: {
      borderColor: palette.warning,
    },
  },
}));

export const focused = style(({ palette, shadows }) => ({
  selectors: {
    [`${textArea.container}&`]: {
      boxShadow: shadows.line,
      outline: `${palette.focus} auto 5px`,
    },
  },
}));
