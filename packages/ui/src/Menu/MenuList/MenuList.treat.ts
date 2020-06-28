import { style } from 'treat';

export const root = style(({ sizing }) => ({
  flexDirection: 'column',
  display: 'flex',
  paddingTop: sizing('tiny') / 2,
  paddingRight: 0,
  paddingBottom: sizing('tiny') / 2,
  paddingLeft: 0,
  margin: 0,
  listStyle: 'none',
}));
