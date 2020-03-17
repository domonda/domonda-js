/**
 *
 * Checkbox
 *
 */

import React from 'react';
import clsx from 'clsx';
import {
  createStyles,
  withStyles,
  WithStyles,
  Color,
  COLORS,
  TypographySize,
  TYPOGRAPHY_SIZES,
} from '../styles';

const styles = createStyles(({ typography, palette, spacing, transition }) => ({
  root: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: transition.create(['color']),
    '& > input': {
      // we don't display: 'none' to retain focusable state
      cursor: 'pointer',
      position: 'absolute',
      opacity: 0,
      margin: 0,
      padding: 0,
      '&:checked ~ $uncheckedIcon, &$checked ~ $uncheckedIcon': {
        display: 'none',
      },
      '&:not(:checked):not($checked) ~ $checkedIcon': {
        display: 'none',
      },
    },
    '&$disabled': {
      cursor: 'not-allowed',
      '& > input': {
        cursor: 'not-allowed',
      },
    },
  },
  // {color}
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: {
        color: palette[color],
        '&$disabled': {
          color: palette.fade(color, 0.4),
        },
        '&:not($disabled):hover': {
          color: palette.dark(color),
        },
        '&:not($disabled) > input:focus ~ $uncheckedIcon, & > input:focus ~ $checkedIcon': {
          color: palette.dark(color),
          outline: `2px solid ${palette.light('primary')}`,
        },
        '&:not($disabled) > input:focus ~ $label': {
          color: palette.dark(color),
        },
      },
    }),
    {},
  ),
  // {size}
  ...TYPOGRAPHY_SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [size]: {
        fontSize: typography.sizes[size],
        '& > input': {
          width: typography.sizes[size],
          height: typography.sizes[size],
        },
        '& > $uncheckedIcon > svg, & > $checkedIcon > svg': {
          width: typography.sizes[size],
        },
      },
    }),
    {},
  ),
  label: {
    fontSize: 'inherit',
    color: 'inherit',
    marginLeft: spacing('tiny'),
  },
  uncheckedIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    color: 'inherit',
  },
  checkedIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    color: 'inherit',
  },
  checked: {},
  disabled: {},
}));

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  classes?: WithStyles<typeof styles>['classes'];
  label?: React.ReactNode;
  color?: Color; // default: `accent`
  size?: TypographySize; // default: `small`
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps & WithStyles<typeof styles>>(
  function Checkbox(props, ref) {
    const {
      children,
      classes,
      className,
      label,
      color = 'accent',
      size = 'small',
      disabled,
      checked,
      ...rest
    } = props;
    return (
      <label
        className={clsx(
          classes.root,
          classes[color as keyof typeof classes],
          classes[size as keyof typeof classes],
          checked && classes.checked,
          disabled && classes.disabled,
        )}
      >
        <input
          {...rest}
          className={clsx(checked && classes.checked, className)}
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
        />
        <div className={classes.uncheckedIcon}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="circle"
            className="svg-inline--fa fa-circle fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
            ></path>
          </svg>
        </div>
        <div className={classes.checkedIcon}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check-circle"
            className="svg-inline--fa fa-check-circle fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
            ></path>
          </svg>
        </div>
        {label && <span className={classes.label}>{label}</span>}
      </label>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox';
}

const StyledCheckbox = withStyles(styles)(Checkbox);
export { StyledCheckbox as Checkbox };
