/**
 *
 * Radio
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
      '&:checked ~ $unchecked': {
        display: 'none',
      },
      '&:not(:checked) ~ $checked': {
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
        '&:not($disabled) > input:focus ~ $unchecked, & > input:focus ~ $checked': {
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
        '& > $unchecked > svg, & > $checked > svg': {
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
  unchecked: {
    display: 'flex',
    alignItems: 'flex-start',
    color: 'inherit',
  },
  checked: {
    display: 'flex',
    alignItems: 'flex-start',
    color: 'inherit',
  },
  disabled: {},
}));

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  classes?: WithStyles<typeof styles>['classes'];
  label?: React.ReactNode;
  color?: Color; // default: `accent`
  size?: TypographySize; // default: `small`
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps & WithStyles<typeof styles>>(
  function Radio(props, ref) {
    const {
      children,
      classes,
      className,
      label,
      color = 'accent',
      size = 'small',
      disabled,
      ...rest
    } = props;
    return (
      <label
        className={clsx(
          classes.root,
          classes[color as keyof typeof classes],
          classes[size as keyof typeof classes],
          disabled && classes.disabled,
          className,
        )}
      >
        <input {...rest} ref={ref} type="radio" disabled={disabled} />

        <div className={classes.unchecked}>
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

        <div className={classes.checked}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="dot-circle"
            className="svg-inline--fa fa-dot-circle fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"
            ></path>
          </svg>
        </div>

        {label && <span className={classes.label}>{label}</span>}
      </label>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Radio.displayName = 'Radio';
}

const StyledRadio = withStyles(styles)(Radio);
export { StyledRadio as Radio };
