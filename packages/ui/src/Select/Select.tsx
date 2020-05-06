/**
 *
 * Select
 *
 */

import React from 'react';
import { createStyles, withStyles, WithStyles } from '../styles';
import clsx from 'clsx';
import { Label } from '../Label';

const styles = createStyles(({ typography, palette, spacing, shape, shadows }) => ({
  root: {
    display: 'flex',
    textAlign: 'left',
    position: 'relative',
    flexDirection: 'column-reverse', // because we select the `label` using the CSS `+` adjacent sibling selector
  },
  select: {
    // reset
    margin: 0,
    display: 'inherit',
    boxSizing: 'border-box',
    outline: 0,
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    // ./reset
    ...typography.variant('small'),
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    textAlign: 'inherit',
    backgroundColor: palette.white,
    border: `1px solid ${palette.border}`,
    borderRadius: shape.borderRadius.tiny,
    boxShadow: shadows.line,
    padding: spacing('tiny') - 2.5,
    paddingRight: spacing('tiny') + 16, // accommodate the icon
    '&$dense': {
      fontSize: typography.sizes.tiny,
      padding: spacing('tiny') / 2 + 0.5,
      paddingRight: spacing('tiny') / 2 + 16, // accommodate the icon
    },
    '&:invalid': {
      borderColor: palette.warning,
      '& + $label': {
        color: palette.warning,
      },
      '& + $label + $icon': {
        color: palette.warning,
      },
    },
    '&:hover:not($disabled), &:focus': {
      borderColor: palette.dark('border'),
      '&:invalid': {
        borderColor: palette.dark('warning'),
      },
    },
    '&$disabled': {
      cursor: 'not-allowed',
      backgroundColor: palette.disabled,
      color: palette.light('textDark'),
      boxShadow: 'none',
      '& + $label + $icon': {
        color: palette.light('textDark'),
      },
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
    zIndex: 1,
    position: 'absolute',
    right: spacing('tiny') + 2,
    bottom: spacing('tiny'),
    '&$dense': {
      right: spacing('tiny') / 2 + 2,
      bottom: spacing('tiny') / 2 + 2,
    },
    '& > svg': {
      width: 9,
    },
  },
  label: {},
  dense: {},
  disabled: {},
}));

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  label?: React.ReactNode;
  dense?: boolean;
  readOnly?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps & WithStyles<typeof styles>>(
  function Select(props, ref) {
    const { children, classes, className, label, dense, disabled, readOnly, ...rest } = props;
    return (
      <div className={clsx(classes.root, className)}>
        {readOnly ? (
          <input
            value={rest.value}
            readOnly={readOnly}
            disabled={disabled}
            className={clsx(classes.select, dense && classes.dense, disabled && classes.disabled)}
            ref={ref as any} // it should be fine since both `select` and `input` mostly share same properties
          />
        ) : (
          <select
            {...rest}
            disabled={disabled}
            className={clsx(classes.select, dense && classes.dense, disabled && classes.disabled)}
            ref={ref}
          >
            {children}
          </select>
        )}
        {label && <Label className={clsx(classes.label, dense && classes.dense)}>{label}</Label>}
        <div className={clsx(classes.icon, dense && classes.dense)}>
          {/* FontAwesome 5 `caret-down` */}
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="caret-down"
            className="svg-inline--fa fa-caret-down fa-w-10"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
            />
          </svg>
        </div>
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Select.displayName = 'Select';
}

const StyledSelect = withStyles(styles)(Select);
export { StyledSelect as Select };
