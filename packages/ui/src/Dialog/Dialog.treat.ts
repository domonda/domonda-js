import { style } from '../styles/treat';

export const root = style({});

/* Styles applied to the container element if `scroll="paper"`. */
export const scrollPaper = style({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  '@media': {
    print: {
      position: 'absolute !important' as any,
    },
  },
});

/* Styles applied to the container element if `scroll="body"`. */
export const scrollBody = style({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  ':after': {
    content: '""',
    verticalAlign: 'middle',
    display: 'inline-flex',
    width: 0,
    height: '100%',
  },
});

export const container = style({
  height: '100%',
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  '@media': {
    print: {
      height: 'auto',
    },
  },
});

export const paper = style({
  position: 'relative',
  overflowY: 'auto', // Fix IE 11 issue, to remove at some point.
  margin: 48,
  '@media': {
    print: {
      overflowY: 'visible',
      boxShadow: 'none',
    },
  },
});

/* Styles applied to the `Paper` component if `scroll="paper"`. */
export const paperScrollPaper = style({
  flexDirection: 'column',
  display: 'flex',
  maxHeight: 'calc(100% - 96px)',
});

/* Styles applied to the `Paper` component if `scroll="body"`. */
export const paperScrollBody = style({
  verticalAlign: 'middle',
  display: 'inline-flex',
  textAlign: 'left', // 'initial' doesn't work on IE 11
});

/* Styles applied to the `Paper` component if `maxWidth=false`. */
export const paperWidthFalse = style({
  maxWidth: 'calc(100% - 96px)',
});

/* Styles applied to the `Paper` component if `fullWidth={true}`. */
export const paperFullWidth = style({
  width: 'calc(100% - 96px)',
});

/* Styles applied to the `Paper` component if `fullScreen={true}`. */
export const paperFullScreen = style({
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: 'none',
  borderRadius: 0,
  margin: 0,
  selectors: {
    [`${paperScrollBody}&`]: {
      margin: 0,
      maxWidth: '100%',
    },
  },
});
