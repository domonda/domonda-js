import { style, globalStyle } from 'treat';
import { root as buttonRoot } from './Button.treat';

export const root = style(({ shadows, shape }) => ({
  flexWrap: 'nowrap',
  display: 'inline-flex',
  borderRadius: shape.borderRadius.small,
  boxShadow: shadows.line,
}));

globalStyle(`${root} > ${buttonRoot}`, () => ({
  flex: 1,
  borderRadius: 0,
  boxShadow: 'none',
  justifyContent: 'center',
}));

globalStyle(`${root} > ${buttonRoot}:not(:last-child)`, () => ({
  borderRight: 0,
}));

globalStyle(`${root} > ${buttonRoot}:first-child`, ({ shape }) => ({
  borderTopLeftRadius: shape.borderRadius.small,
  borderBottomLeftRadius: shape.borderRadius.small,
}));

globalStyle(`${root} > ${buttonRoot}:last-child`, ({ shape }) => ({
  borderTopRightRadius: shape.borderRadius.small,
  borderBottomRightRadius: shape.borderRadius.small,
}));
