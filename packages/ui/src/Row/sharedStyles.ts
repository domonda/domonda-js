import { Theme } from '../styles/theme';

const sharedStyles = ({ palette, spacing, typography }: Theme) => ({
  row: {
    position: 'relative' as const,
    display: 'flex',
    padding: spacing('tiny'),
  },
  cell: {
    overflow: 'hidden',
    ...typography.variant('small'),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as 'nowrap',
    selectors: {
      '&:empty::before': {
        content: '"\\2014"', // &mdash;
        color: palette.light('textDark'),
      },
      '&:not(:last-child)': {
        marginRight: spacing('tiny'),
      },
    },
  },
});

export default sharedStyles;
