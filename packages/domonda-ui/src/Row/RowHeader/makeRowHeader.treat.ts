import { style } from '../../styles/treat';

import sharedStyles from '../sharedStyles';

export const root = style((theme) => {
  const { row } = sharedStyles(theme);

  return {
    ...row,
    zIndex: 2,
    border: `1px solid ${theme.palette.border}`,
    boxShadow: theme.shadows.line,
    backgroundColor: theme.palette.darken('background', 0.05),
  };
});

export const cell = style((theme) => {
  const { cell } = sharedStyles(theme);

  return {
    ...cell,
    ...theme.typography.variant('small', 'semiBold'),
  };
});
