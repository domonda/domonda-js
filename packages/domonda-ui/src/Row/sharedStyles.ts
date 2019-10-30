import { Theme } from '../styles';

const sharedStyles = (theme: Theme) => ({
  row: {
    position: 'relative' as 'relative',
    display: 'flex',
    padding: theme.spacing('small'),
  },
  cell: {
    ...theme.typography.variant('small'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as 'nowrap',
    '&:not(:last-child)': {
      marginRight: theme.spacing('small'),
    },
    '&:empty::before': {
      content: '"\\2014"', // &mdash;
      color: theme.palette.light('textDark'),
    },
  },
});

export default sharedStyles;
