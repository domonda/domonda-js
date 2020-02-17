import { styleMap, globalStyle } from '../styles/treat';

export const styles = styleMap(() => ({
  root: {},
  /* Styles applied to the container element if `scroll="paper"`. */
  scrollPaper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  /* Styles applied to the container element if `scroll="body"`. */
  scrollBody: {
    overflowX: 'hidden',
    overflowY: 'auto',
    textAlign: 'center',
  },
  container: {
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    height: '100%',
  },
  paper: {
    position: 'relative',
    overflowY: 'auto', // Fix IE 11 issue, to remove at some point.
    margin: 48,
  },
  /* Styles applied to the `Paper` component if `scroll="paper"`. */
  paperScrollPaper: {
    flexDirection: 'column',
    display: 'flex',
    maxHeight: 'calc(100% - 96px)',
  },
  /* Styles applied to the `Paper` component if `scroll="body"`. */
  paperScrollBody: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    textAlign: 'left', // 'initial' doesn't work on IE 11
  },
  /* Styles applied to the `Paper` component if `maxWidth=false`. */
  paperWidthFalse: {
    maxWidth: 'calc(100% - 96px)',
  },
  /* Styles applied to the `Paper` component if `fullWidth={true}`. */
  paperFullWidth: {
    width: 'calc(100% - 96px)',
  },
  /* Styles applied to the `Paper` component if `fullScreen={true}`. */
  paperFullScreen: {
    margin: 0,
    borderRadius: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'none',
  },
}));

globalStyle(`${styles.root}@media print`, () => ({
  position: 'absolute !important' as any,
}));

// scrollBody
globalStyle(`${styles.scrollBody}:after`, () => ({
  content: '""',
  verticalAlign: 'middle',
  display: 'inline-flex',
  width: 0,
  height: '100%',
}));

// container
globalStyle(`${styles.container}@media print`, () => ({
  height: 'auto',
}));

// paper
globalStyle(`${styles.paper}@media print`, () => ({
  overflowY: 'visible',
  boxShadow: 'none',
}));

// paperFullScreen
globalStyle(`${styles.paperFullScreen}${styles.paperScrollBody}`, () => ({
  margin: 0,
  maxWidth: '100%',
}));
