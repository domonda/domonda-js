import { Theme } from '../styles/theme';

const sharedStyles = ({ palette, sizing, typography }: Theme) => ({
  row: {
    position: 'relative' as const,
    display: 'flex',
    padding: sizing('small'),
  },
  cell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    fontFamily: typography.fonts.body,
    selectors: {
      '&:empty::before': {
        content: '"\\2014"', // &mdash;
        color: palette.light('text'),
      },
      '&:not(:last-child)': {
        marginRight: sizing('small'),
      },
    },
  },
});

export default sharedStyles;
