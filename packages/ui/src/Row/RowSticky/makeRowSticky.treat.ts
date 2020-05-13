import { style } from '../../styles/treat';

import sharedStyles from '../sharedStyles';

export const root = style((theme) => {
  const { row } = sharedStyles(theme);

  return {
    ...row,
    position: 'sticky',
    zIndex: 2,
    top: 0,
    border: `1px solid ${theme.palette.border}`,
    boxShadow: theme.shadows.line,
    backgroundColor: theme.palette.darken('background', 0.03),
    ...theme.typography.variant('small', 'medium'),
  };
});
