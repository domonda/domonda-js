/**
 *
 * Select
 *
 */

import React from 'react';
import { createStyles, withStyles, WithStyles } from '../styles';
import clsx from 'clsx';
import { svgIconClassName } from '../SvgIcon';
import { SvgExpandMoreIcon } from '../SvgIcon/SvgExpandMoreIcon';

const styles = createStyles(({ typography, palette, spacing, shape, shadows }) => ({
  root: {
    position: 'relative',
    textAlign: 'left',
  },
  select: {
    zIndex: 1,
    position: 'relative',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    outline: 'none',
    userSelect: 'none',
    minWidth: 16,
    width: '100%',
    padding: spacing(0.35, 1),
    background: 'transparent',
    'select&': {
      cursor: 'pointer',
    },
    border: `1px solid ${palette.dark('border')}`,
    borderRadius: shape.borderRadius,
    overflow: 'hidden',
    '&::placeholder': {
      color: palette.textSecondary,
    },
    '&::-ms-expand': {
      display: 'none',
    },
    '&:invalid': {
      color: palette.warning,
      borderColor: palette.warning,
      '& + $icon, & + $label + $icon, & + $label': {
        color: palette.warning,
      },
    },
    '&:hover, &:focus': {
      borderColor: palette.darkest('border'),
      '&:not($disabled)': {
        '& + $icon, & + $label + $icon': {
          color: palette.textPrimary,
        },
      },
    },
    '&:focus': {
      boxShadow: shadows[5],
      '& + $icon, & + $label + $icon, & + $label': {
        zIndex: 1,
      },
      backgroundColor: palette.surface,
      '&:invalid': {
        backgroundColor: palette.lightest('warning'),
      },
    },
    '&$disabled': {
      cursor: 'not-allowed',
      color: palette.textSecondary,
      borderColor: palette.border,
    },
  },
  selectWithLabel: {
    padding: spacing(2, 1, 0.35, 1),
  },
  selectDense: {
    padding: spacing(0, 0.35),
  },
  selectDenseWithLabel: {
    padding: spacing(1.35, 0.35, 0, 0.35),
  },
  icon: {
    zIndex: 0,
    position: 'absolute',
    display: 'inline-flex',
    top: 0,
    bottom: 0,
    right: 0,
    paddingRight: spacing(1),
    alignItems: 'center',
    color: palette.textSecondary,
    [`& > .${svgIconClassName}`]: {
      color: 'inherit',
    },
  },
  iconDense: {
    paddingRight: spacing(0.35),
  },
  label: {
    zIndex: 0,
    alignItems: 'flex-start',
    top: 0,
    bottom: 0,
    left: 0,
    paddingTop: spacing(0.5),
    paddingLeft: spacing(1),
    color: palette.dark('textSecondary'),
    display: 'inline-flex',
    lineHeight: 1,
    position: 'absolute',
    ...typography.label,
  },
  labelDense: {
    paddingLeft: spacing(0.35),
  },
  disabled: {},
}));

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  classes?: WithStyles<typeof styles>['classes'];
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
            className={clsx(
              classes.select,
              label && classes.selectWithLabel,
              dense && classes.selectDense,
              dense && label && classes.selectDenseWithLabel,
              disabled && classes.disabled,
            )}
            ref={ref as any} // it should be fine since both `select` and `input` moslty share same properties
          />
        ) : (
          <select
            {...rest}
            disabled={disabled}
            className={clsx(
              classes.select,
              label && classes.selectWithLabel,
              dense && classes.selectDense,
              dense && label && classes.selectDenseWithLabel,
              disabled && classes.disabled,
            )}
            ref={ref}
          >
            {children}
          </select>
        )}
        {label && <div className={clsx(classes.label, dense && classes.labelDense)}>{label}</div>}
        <div className={clsx(classes.icon, dense && classes.iconDense)}>
          <SvgExpandMoreIcon />
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
