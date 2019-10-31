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
    display: 'inline-block',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    outline: 0,
    // ./reset
    ...typography.variant('small'),
    textAlign: 'inherit',
    backgroundColor: palette.white,
    border: `1px solid ${palette.border}`,
    borderRadius: shape.borderRadius.small,
    boxShadow: shadows.line,
    padding: spacing('small'),
    color: palette.textDark,
    '&$dense': {
      padding: spacing('tiny'),
    },
    '&::placeholder': {
      color: palette.light('textDark'),
    },
    '&:invalid': {
      borderColor: palette.warning,
      backgroundColor: palette.lightest('warning'),
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
      backgroundColor: palette.disabled,
      color: palette.light('textDark'),
    },
  },
  label: {},
  dense: {},
  disabled: {},
}));

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  label?: React.ReactNode;
  dense?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps & WithStyles<typeof styles>>(
  function Input(props, ref) {
    const { classes, className, label, dense, disabled, ...rest } = props;
    return (
      <div className={clsx(classes.root, className)}>
        <input
          {...rest}
          ref={ref}
          disabled={disabled}
          className={clsx(classes.input, dense && classes.dense, disabled && classes.disabled)}
        />
        {label && <Label className={clsx(classes.label, dense && classes.dense)}>{label}</Label>}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Input.displayName = 'Input';
}

const Styled = withStyles(styles)(Input);
export { Styled as Input };
