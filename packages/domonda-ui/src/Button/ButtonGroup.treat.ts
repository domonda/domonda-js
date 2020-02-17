import { styleMap, globalStyle } from '../styles/treat';

import { styles as buttonStyles } from './Button.treat';

export const styles = styleMap(({ shadows, shape }) => ({
  root: {
    flexWrap: 'nowrap',
    display: 'inline-flex',
    boxShadow: shadows.line,
    borderRadius: shape.borderRadius.tiny,
  },
}));

globalStyle(`${styles.root} > ${buttonStyles.root}`, () => ({
  flex: 1,
  boxShadow: 'none',
  borderRadius: 0,
}));

globalStyle(`${styles.root} > ${buttonStyles.root}:not(:last-child)`, () => ({
  borderRight: 0,
}));

globalStyle(`${styles.root} > ${buttonStyles.root}:first-child`, ({ shape }) => ({
  borderTopLeftRadius: shape.borderRadius.tiny,
  borderBottomLeftRadius: shape.borderRadius.tiny,
}));

globalStyle(`${styles.root} > ${buttonStyles.root}:last-child`, ({ shape }) => ({
  borderTopRightRadius: shape.borderRadius.tiny,
  borderBottomRightRadius: shape.borderRadius.tiny,
}));
