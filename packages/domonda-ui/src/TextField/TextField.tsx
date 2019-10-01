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
  },
  input: {
    width: '100%',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    border: `1px solid ${palette.dark('border')}`,
    borderRadius: shape.borderRadius,
    padding: spacing(0.35, 1),
    textAlign: 'inherit',
    position: 'relative',
    background: 'transparent',
    zIndex: 1,
    outline: 'none',
    '&::placeholder': {
      color: palette.textSecondary,
    },
    '&:invalid': {
      color: palette.warning,
      borderColor: palette.warning,
      '& + $label': {
        color: palette.warning,
      },
    },
    '&:hover': {
      borderColor: palette.darkest('border'),
    },
    '&:focus': {
      boxShadow: shadows[5],
      borderColor: palette.darkest('border'),
      '& + $label': {
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
  inputWithLabel: {
    padding: spacing(2, 1, 0.35, 1),
  },
  inputDense: {
    padding: spacing(0, 0.35),
  },
  inputDenseWithLabel: {
    padding: spacing(1.35, 0.35, 0, 0.35),
  },
  label: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    position: 'absolute',
    lineHeight: 1,
    top: 0,
    bottom: 0,
    left: 0,
    color: palette.dark('textSecondary'),
    paddingTop: spacing(0.5),
    paddingLeft: spacing(1),
    ...typography.label,
  },
  labelDense: {
    paddingLeft: spacing(0.35),
  },
  disabled: {},
}));

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classes?: WithStyles<typeof styles>['classes'];
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
          className={clsx(
            classes.input,
            label && classes.inputWithLabel,
            dense && classes.inputDense,
            dense && label && classes.inputDenseWithLabel,
            disabled && classes.disabled,
          )}
        />
        {label && (
          <label className={clsx(classes.label, dense && classes.labelDense)}>{label}</label>
        )}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  TextField.displayName = 'TextField';
}

const Styled = withStyles(styles)(TextField);
export { Styled as TextField };
