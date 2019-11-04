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
      color: palette.dark('primary'),
      backgroundColor: palette.lighten('primary', 0.85),
    },
  };

  return {
    root: {
      width: '100%',
      padding: spacing('tiny'),
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      color: palette.textDark,
      borderBottom: '3px solid transparent',
      transition: transition.create(['color', 'background-color']),
      ...typography.variant('small'),
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
      backgroundColor: palette.lightest('secondary'),
    },
    highlighted,
    disabled: {
      pointerEvents: 'none',
      backgroundColor: palette.disabled,
      color: palette.light('textDark'),
    },
  };
});

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
