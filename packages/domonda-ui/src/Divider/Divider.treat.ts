import { styleMap } from '../styles/treat';

export const styles = styleMap(({ spacing }) => ({
  root: {
    opacity: 0.6,
    margin: spacing('tiny', 'none'),
    borderStyle: 'solid',
    borderBottom: 0,
  },
}));
