import { style } from 'treat';
import sharedStyles from '../sharedStyles';

export const root = style((theme) => {
  const { row } = sharedStyles(theme);
  return {
    ...row,
    zIndex: 2,
    border: `2px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.darken('background', 0.05),
  };
});

export const cell = style((theme) => {
  const { cell } = sharedStyles(theme);
  return {
    ...cell,
    fontWeight: theme.typography.weights.bold,
  };
});
