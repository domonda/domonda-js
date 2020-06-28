import { style, globalStyle } from 'treat';
import { input } from '../Input/Input.treat';

export const dense = style({});

export const hasLabel = style({});

export const root = style({
  position: 'relative',
});

export const clearButton = style(({ sizing }) => ({
  zIndex: 1,
  position: 'absolute',
  top: sizing('tiny'),
  right: sizing('tiny'),
  selectors: {
    [`${hasLabel}&`]: {
      top: sizing('tiny') * 3,
    },
    [`${dense}&`]: {
      top: sizing('tiny') - 1,
      right: sizing('tiny') - 1,
    },
    [`${dense}${hasLabel}`]: {
      top: sizing('tiny') * 3 - 2,
    },
  },
}));

export const inputWithClearButton = style({});

globalStyle(`${inputWithClearButton} > ${input}`, ({ sizing }) => ({
  paddingRight: `${sizing('tiny') * 4 - 4}px !important`,
}));

globalStyle(`${inputWithClearButton}${dense} > ${input}`, ({ sizing }) => ({
  paddingRight: `${sizing('tiny') * 3}px !important`,
}));
