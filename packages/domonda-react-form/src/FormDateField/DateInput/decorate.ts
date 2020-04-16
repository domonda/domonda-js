import { createStyles, withStyles, WithStyles } from '@domonda/ui/styles';

const styles = createStyles({
  root: {
    '& > div, & .react-datepicker-wrapper, & .react-datepicker__input-container': {
      display: 'inherit',
      '& input': {
        width: '100%',
      },
    },
  },
  popper: {
    // NOTE: here we use `!important` because the default `react-datepicker` stylesheet is prioritized
    zIndex: '1500 !important' as any,
    '& .react-datepicker__triangle': {
      left: '50%',
    },
  },
  calendar: {
    '& .react-datepicker__navigation': {
      boxSizing: 'border-box',
    },
  },
});

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
