import { style, globalStyle } from '../styles/treat';
import { input } from '../Input/Input.treat';

export const dense = style({});

export const hasLabel = style({});

export const root = style({
  position: 'relative',
});

export const clearButton = style(({ spacing }) => ({
  zIndex: 1,
  position: 'absolute',
  top: spacing('tiny'),
  right: spacing('tiny'),
  selectors: {
    [`${hasLabel}&`]: {
      top: spacing('tiny') * 3,
    },
    [`${dense}&`]: {
      top: spacing('tiny') - 1,
      right: spacing('tiny') - 1,
    },
    [`${dense}${hasLabel}`]: {
      top: spacing('tiny') * 3 - 2,
    },
  },
}));

export const inputWithClearButton = style({});

globalStyle(`${inputWithClearButton} > ${input}`, ({ spacing }) => ({
  paddingRight: `${spacing('tiny') * 4 - 4}px !important`,
}));

globalStyle(`${inputWithClearButton}${dense} > ${input}`, ({ spacing }) => ({
  paddingRight: `${spacing('tiny') * 3}px !important`,
}));
