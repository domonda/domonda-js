/**
 *
 * Input
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles } from '../styles';
import { Label } from '../Label';

const styles = createStyles(({ palette, spacing, shadows, shape, typography }) => ({
  root: {
    display: 'flex',
    textAlign: 'left',
    position: 'relative',
    flexDirection: 'column-reverse', // because we select the `label` using the CSS `+` adjacent sibling selector
  },
  input: {
    // reset
    margin: 0,
    display: 'inline-flex',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    outline: 0,
    border: 0,
    backgroundColor: 'transparent',
    textOverflow: 'ellipsis',
    // ./reset
    ...typography.variant('small'),
    textAlign: 'inherit',
    color: palette.textDark,
    '&:not($naked)': {
      backgroundColor: palette.white,
      border: `1px solid ${palette.border}`,
      borderRadius: shape.borderRadius.small,
      boxShadow: shadows.line,
      padding: spacing('tiny') - 2.5,
    },
    '&$dense': {
      fontSize: typography.sizes.tiny,
      padding: spacing('tiny') / 2 + 0.5,
    },
    '&::placeholder': {
      color: palette.light('textDark'),
    },
    '&:invalid': {
      '&:not($naked)': {
        borderColor: palette.warning,
        backgroundColor: palette.lightest('warning'),
      },
      '& + $label': {
        color: palette.warning,
      },
      '&::placeholder': {
        color: palette.light('warning'),
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
      color: palette.lighten('textDark', 0.68),
      boxShadow: 'none',
      '&:not($naked)': {
        backgroundColor: palette.disabled,
      },
    },
  },
  label: {},
  dense: {},
  naked: {},
  disabled: {},
}));

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  label?: React.ReactNode;
  dense?: boolean;
  naked?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps & WithStyles<typeof styles>>(
  function Input(props, ref) {
    const { classes, className, label, dense, naked, disabled, ...rest } = props;
    return (
      <div className={clsx(classes.root, className)}>
        <input
          {...rest}
          ref={ref}
          disabled={disabled}
          className={clsx(
            classes.input,
            dense && classes.dense,
            naked && classes.naked,
            disabled && classes.disabled,
          )}
        />
        {label && (
          <Label className={clsx(classes.label, dense && classes.dense, naked && classes.naked)}>
            {label}
          </Label>
        )}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Input.displayName = 'Input';
}

const Styled = withStyles(styles)(Input);
export { Styled as Input };
