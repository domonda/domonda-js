/**
 *
 * DateInput
 *
 */

import React, { RefAttributes } from 'react';
import clsx from 'clsx';
import ReactDatePicker from 'react-datepicker';

// ui
import { Portal } from '@domonda/ui/Portal';

// decorate
import 'react-datepicker/dist/react-datepicker.min.css';
import { createStyles, withStyles, WithStyles } from '@domonda/ui/styles';
const styles = createStyles(({ zIndex }) => ({
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
    zIndex: `${zIndex.tooltip} !important` as any,
    '& .react-datepicker__triangle': {
      left: '50%',
    },
  },
  calendar: {
    '& .react-datepicker__navigation': {
      boxSizing: 'border-box',
    },
  },
}));

export interface DateInputProps {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  adjustDateOnChange?: boolean;
  allowSameDay?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  calendarClassName?: string;
  calendarContainer?(props: { children: React.ReactNode[] }): React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  clearButtonTitle?: string;
  customInput?: React.ReactNode;
  customInputRef?: string;
  dateFormat?: string | string[];
  dateFormatCalendar?: string;
  dayClassName?(date: Date): string | null;
  disabled?: boolean;
  disabledKeyboardNavigation?: boolean;
  dropdownMode?: 'scroll' | 'select';
  endDate?: Date | null;
  excludeDates?: Date[];
  excludeTimes?: Date[];
  filterDate?(date: Date): boolean;
  fixedHeight?: boolean;
  forceShowMonthNavigation?: boolean;
  formatWeekDay?(formattedDate: string): string;
  formatWeekNumber?(date: Date): string | number;
  highlightDates?:
    | {
        [className: string]: Date[];
      }[]
    | Date[];
  id?: string;
  includeDates?: Date[];
  includeTimes?: Date[];
  injectTimes?: Date[];
  inline?: boolean;
  isClearable?: boolean;
  locale?: string | Locale;
  maxDate?: Date | null;
  maxTime?: Date;
  minDate?: Date | null;
  minTime?: Date;
  monthsShown?: number;
  name?: string;
  nextMonthButtonLabel?: string;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  onChange(date: Date | null, event: React.SyntheticEvent<any> | undefined): void;
  onChangeRaw?(event: React.FocusEvent<HTMLInputElement>): void;
  onClickOutside?(event: React.MouseEvent<HTMLDivElement>): void;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onInputClick?(): void;
  onInputError?(err: { code: number; msg: string }): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
  onMonthChange?(date: Date): void;
  onSelect?(date: Date, event: React.SyntheticEvent<any> | undefined): void;
  onWeekSelect?(
    firstDayOfWeek: Date,
    weekNumber: string | number,
    event: React.SyntheticEvent<any> | undefined,
  ): void;
  onYearChange?(date: Date): void;
  open?: boolean;
  openToDate?: Date;
  peekNextMonth?: boolean;
  placeholderText?: string;
  popperClassName?: string;
  popperContainer?(props: { children: React.ReactNode | undefined }): React.ReactNode;
  popperModifiers?: any;
  popperPlacement?: string;
  popperProps?: {};
  preventOpenOnFocus?: boolean;
  previousMonthButtonLabel?: string;
  readOnly?: boolean;
  renderCustomHeader?(params: {
    date: Date;
    changeYear(year: number): void;
    changeMonth(month: number): void;
    decreaseMonth(): void;
    increaseMonth(): void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }): React.ReactNode;
  renderDayContents?(dayOfMonth: number): React.ReactNode;
  required?: boolean;
  scrollableMonthYearDropdown?: boolean;
  scrollableYearDropdown?: boolean;
  selected?: Date | null;
  selectsEnd?: boolean;
  selectsStart?: boolean;
  shouldCloseOnSelect?: boolean;
  showDisabledMonthNavigation?: boolean;
  showMonthDropdown?: boolean;
  showMonthYearDropdown?: boolean;
  showMonthYearPicker?: boolean;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  showWeekNumbers?: boolean;
  showYearDropdown?: boolean;
  startDate?: Date | null;
  startOpen?: boolean;
  strictParsing?: boolean;
  tabIndex?: number;
  timeCaption?: string;
  timeFormat?: string;
  timeIntervals?: number;
  title?: string;
  todayButton?: React.ReactNode;
  useShortMonthInDropdown?: boolean;
  useWeekdaysShort?: boolean;
  value?: string;
  weekLabel?: string;
  yearDropdownItemNumber?: number;
  timeInputLabel?: string;
  focusSelectedMonth?: boolean;
  onDayMouseEnter?: (date: Date) => void;
  onMonthMouseLeave?: () => void;
}

const DateInputPopperPortal: React.FC<{ children: React.ReactNode | undefined }> = ({
  children,
}) => {
  if (!children) {
    return null;
  }

  return (
    <Portal>
      <div role="tooltip">{children}</div>
    </Portal>
  );
};

const DateInput = React.forwardRef<ReactDatePicker, DateInputProps & WithStyles<typeof styles>>(
  function DateField(props, ref) {
    const { children, classes, className, popperClassName, calendarClassName, ...rest } = props;
    return (
      <div className={clsx(classes.root, className)}>
        <ReactDatePicker
          dateFormat="dd.MM.yyyy"
          popperContainer={DateInputPopperPortal}
          popperPlacement="bottom"
          popperModifiers={{
            preventOverflow: {
              enabled: true,
            },
          }}
          {...rest}
          ref={ref}
          popperClassName={clsx(classes.popper, popperClassName)}
          calendarClassName={clsx(classes.calendar, calendarClassName)}
        />
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  DateInput.displayName = 'DateInput';
}

const StyledDateInput: React.ComponentType<
  DateInputProps & RefAttributes<ReactDatePicker>
> = withStyles(styles)(DateInput);
export { StyledDateInput as DateInput };
