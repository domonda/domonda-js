import { style, styleMap, globalStyle } from 'treat';

export const root = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

export const label = style(() => ({}));

export const input = styleMap(({ palette, sizing, shape, typography }) => ({
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
    padding: `calc(${sizing('regular')} / 2)`,
    ...typography.variant('regular'),
    textAlign: 'inherit',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '--webkit-appearance': 'none',
    '::placeholder': {
      color: palette.light('text'),
    },
  },
  startAdornment: {
    display: 'flex',
    padding: sizing('none', 'tiny'),
  },
  endAdornment: {
    display: 'flex',
    padding: sizing('none', 'tiny'),
  },
}));

globalStyle(`${input.startAdornment} > svg, ${input.endAdornment} > svg`, ({ sizing }) => ({
  height: sizing('regular'),
}));

export const naked = style(({ sizing }) => ({
  selectors: {
    [`${input.container}&`]: {
      backgroundColor: 'transparent',
      border: 0,
    },
    [`${input.root}&`]: {
      padding: sizing('regular'),
    },
  },
}));

export const dense = style(({ sizing }) => ({
  selectors: {
    [`${label}&`]: {
      lineHeight: 1.125,
    },
    [`${input.root}&`]: {
      padding: sizing('tiny'),
    },
  },
}));

export const disabled = style(({ palette }) => ({
  selectors: {
    [`${label}&`]: {
      color: palette.warning,
    },
    [`${input.container}&`]: {
      cursor: 'not-allowed',
      backgroundColor: palette.disabled,
    },
  },
}));

export const invalid = style(({ palette }) => ({
  selectors: {
    [`${input.container}&`]: {
      borderColor: palette.warning,
    },
    [`${input.root}&`]: {
      borderColor: palette.warning,
    },
  },
}));

export const focused = style(({ palette, shadows }) => ({
  selectors: {
    [`${input.container}&`]: {
      boxShadow: shadows.line,
      outline: `${palette.focus} auto 5px`,
    },
  },
}));
