import { Theme } from '../styles';

const sharedStyles = (theme: Theme) => ({
  row: {
    position: 'relative' as 'relative',
    display: 'flex',
    padding: theme.spacing(1),
  },
  cell: {
    ...theme.typography.variant('small'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as 'nowrap',
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
    '&:empty::before': {
      content: '"\\2014"', // &mdash;
      color: theme.palette.textSecondary,
    },
  },
});

export default sharedStyles;
