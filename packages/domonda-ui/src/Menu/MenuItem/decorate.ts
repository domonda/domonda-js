import { createStyles, withStyles, WithStyles, CSSProperties } from '../../styles';

const styles = createStyles(({ palette, spacing, transition, typography }) => {
  const highlighted = {
    color: palette.primary,
    backgroundColor: palette.lightest('primary'),
  };

  const clickable: CSSProperties = {
    cursor: 'pointer',
    '&:hover, &:focus': highlighted,
    '&:focus': {
      outline: `3px solid ${palette.light('primary')}`,
    },
    '&:active': {
      outline: 'none',
      color: palette.darker('primary'),
      backgroundColor: palette.light('primary'),
    },
  };

  return {
    root: {
      width: '100%',
      padding: spacing(0.25, 1),
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      lineHeight: 3,
      color: palette.textPrimary,
      borderBottom: '3px solid transparent',
      transition: transition.create(['color', 'background-color']),
      ...typography.body,
      fontWeight: typography.weights.semiBold,
      'a&': clickable,
    },
    text: {
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    clickable,
    selected: {
      color: palette.secondary,
      backgroundColor: palette.lighter('secondary'),
    },
    highlighted,
    disabled: {
      pointerEvents: 'none',
      color: palette.textSecondary,
      backgroundColor: palette.dark('surface'),
    },
  };
});

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
