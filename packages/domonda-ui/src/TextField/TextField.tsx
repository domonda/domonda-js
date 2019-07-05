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
    paddingTop: spacing(2),
    paddingLeft: spacing(),
    paddingBottom: spacing(0.35),
    textAlign: 'inherit',
    position: 'relative',
    background: 'transparent',
    zIndex: 1,
    '&::placeholder': {
      color: palette.textSecondary,
    },
    '&:invalid': {
      color: palette.warning,
      borderColor: 'currentColor',
      '& + $label': {
        color: palette.warning,
      },
    },
    '&:focus': {
      backgroundColor: palette.surface,
      boxShadow: shadows[5],
      outline: 'none',
      borderColor: palette.darkest('border'),
      '& + $label': {
        zIndex: 1,
      },
    },
    '&$disabled': {
      color: palette.textSecondary,
    },
  },
  label: {
    transition: 'font-size 100ms, color 200ms',
    display: 'inline-flex',
    alignItems: 'flex-start',
    position: 'absolute',
    lineHeight: 1,
    paddingTop: spacing(0.5),
    paddingBottom: spacing(0.5),
    top: 0,
    bottom: 0,
    left: spacing(),
    textTransform: 'uppercase',
    fontSize: '.75rem',
    color: palette.dark('textSecondary'),
    fontWeight: typography.weights.semiBold,
  },
  disabled: {},
}));

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const textFieldClassName = generateStaticClassName('TextField');

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps & WithStyles<typeof styles>>(
  function TextField(props, ref) {
    const { classes, className, label, disabled, ...rest } = props;
    return (
      <div className={clsx(classes.root, textFieldClassName, className)}>
        <input
          {...rest}
          disabled={disabled}
          className={clsx(classes.input, disabled && classes.disabled)}
          ref={ref}
        />
        {label && <label className={classes.label}>{label}</label>}
      </div>
    );
  },
);

TextField.displayName = 'TextField';

const Styled = withStyles(styles)(TextField);
export { Styled as TextField };
