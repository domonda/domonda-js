import { style, globalStyle } from '../styles/treat';

import * as buttonStyles from './Button.treat';

export const root = style(({ shadows, shape }) => ({
  flexWrap: 'nowrap',
  display: 'inline-flex',
  borderRadius: shape.borderRadius.tiny,
  boxShadow: shadows.line,
}));

globalStyle(`${root} > ${buttonStyles.root}`, () => ({
  flex: 1,
  borderRadius: 0,
  boxShadow: 'none',
}));

globalStyle(`${root} > ${buttonStyles.root}:not(:last-child)`, () => ({
  borderRight: 0,
}));

globalStyle(`${root} > ${buttonStyles.root}:first-child`, ({ shape }) => ({
  borderTopLeftRadius: shape.borderRadius.tiny,
  borderBottomLeftRadius: shape.borderRadius.tiny,
}));

globalStyle(`${root} > ${buttonStyles.root}:last-child`, ({ shape }) => ({
  borderTopRightRadius: shape.borderRadius.tiny,
  borderBottomRightRadius: shape.borderRadius.tiny,
}));
