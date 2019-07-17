import { createStyles, withStyles, WithStyles } from '../../styles';

const styles = createStyles(({ palette, spacing, transition, typography }) => {
  const highlightedProps = {
    color: palette.primary,
    backgroundColor: palette.light('primary'),
  };

  return {
    root: {
      width: '100%',
      padding: spacing(0.25, 1),
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      lineHeight: 3,
      color: palette.textSecondary,
      borderBottom: '3px solid transparent',
      transition: transition.create(['color', 'background-color']),
      ...typography.body,
      fontWeight: typography.weights.semiBold,
      '&:hover': highlightedProps,
      '&:active': {
        color: palette.darker('primary'),
        backgroundColor: palette.light('primary'),
      },
    },
    text: {
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    clickable: {
      cursor: 'pointer',
      '&:focus': {
        outline: `2px solid ${palette.secondary}`,
      },
    },
    selected: {
      color: palette.secondary,
      backgroundColor: palette.lighter('secondary'),
    },
    highlighted: highlightedProps,
  };
});

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
