/**
 *
 * TextField
 *
 */

import * as React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles, generateStaticClassName } from '../styles';

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
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: shape.borderRadius.small,
    boxShadow: shadows.line,
    padding: spacing('small'),
    '&$dense': {
      padding: spacing('tiny'),
    },
    '&::placeholder': {
      color: palette.textSecondary,
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
      borderColor: palette.darker('border'),
      '&:invalid': {
        borderColor: palette.darker('warning'),
      },
    },
    '&$disabled': {
      cursor: 'not-allowed',
      backgroundColor: palette.dark('surface'),
      color: palette.textSecondary,
    },
  },
  label: {
    ...typography.variant('tiny', 'medium'),
    color: palette.secondary,
  },
  dense: {},
  disabled: {},
}));

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  label?: React.ReactNode;
  dense?: boolean;
}

export const textFieldClassName = generateStaticClassName('TextField');

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps & WithStyles<typeof styles>>(
  function TextField(props, ref) {
    const { classes, className, label, dense, disabled, ...rest } = props;
    return (
      <div className={clsx(classes.root, textFieldClassName, className)}>
        <input
          {...rest}
          ref={ref}
          disabled={disabled}
          className={clsx(classes.input, dense && classes.dense, disabled && classes.disabled)}
        />
        {label && <label className={clsx(classes.label, dense && classes.dense)}>{label}</label>}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  TextField.displayName = 'TextField';
}

const Styled = withStyles(styles)(TextField);
export { Styled as TextField };
