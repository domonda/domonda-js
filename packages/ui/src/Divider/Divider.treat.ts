import { style } from '../styles/treat';

export const root = style(({ spacing }) => ({
  opacity: 0.6,
  borderBottom: 0,
  borderStyle: 'solid',
  margin: spacing('tiny', 'none'),
}));
