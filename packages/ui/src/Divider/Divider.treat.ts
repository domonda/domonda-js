import { style } from 'treat';

export const root = style(({ sizing }) => ({
  opacity: 0.6,
  borderBottom: 0,
  borderStyle: 'solid',
  margin: sizing('tiny', 'none'),
}));
