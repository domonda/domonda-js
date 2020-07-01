import { Theme } from '../styles';

const sharedStyles = (theme: Theme) => ({
  row: {
    position: 'relative' as const,
    display: 'flex',
    padding: theme.spacing('tiny'),
  },
  cell: {
    ...theme.typography.variant('small'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    '&:not(:last-child)': {
      marginRight: theme.spacing('tiny'),
    },
    '&:empty::before': {
      content: '"\\2014"', // &mdash;
      color: theme.palette.light('textDark'),
    },
  },
});

export default sharedStyles;
