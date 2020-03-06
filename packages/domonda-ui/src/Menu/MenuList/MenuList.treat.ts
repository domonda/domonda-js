import { style } from '../../styles/treat';

export const root = style(({ spacing }) => ({
  flexDirection: 'column',
  display: 'flex',
  paddingTop: spacing('tiny') / 2,
  paddingRight: 0,
  paddingBottom: spacing('tiny') / 2,
  paddingLeft: 0,
  margin: 0,
  listStyle: 'none',
}));
