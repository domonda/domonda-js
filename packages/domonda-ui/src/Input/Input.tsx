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
    display: 'inherit',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    outline: 0,
    border: 0,
    backgroundColor: 'transparent',
    textOverflow: 'ellipsis',
    backgroundClip: 'padding-box',
    WebkitAppearance: 'none',
    // ./reset
    ...typography.variant('small'),
    textAlign: 'inherit',
    color: palette.textDark,
    '&:not($naked)': {
      backgroundColor: palette.white,
      border: `1px solid ${palette.border}`,
      borderRadius: shape.borderRadius.tiny,
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
      },
      '& + $label': {
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
      color: palette.lighten('textDark', 0.68),
      boxShadow: 'none',
      '&:not($naked)': {
        backgroundColor: palette.disabled,
      },
    },
    '&$startSvg, &$endSvg': {
      '& ~ $startSvg, & ~ $endSvg': {
        display: 'flex',
        position: 'absolute',
        pointerEvents: 'none',
        color: palette.gray30,
        bottom: typography.sizes['small'] / 2 + 1,
        '& > svg': {
          width: typography.sizes['small'],
        },
      },
      '&$dense': {
        '& ~ $startSvg, & ~ $endSvg': {
          bottom: typography.sizes['tiny'] / 2 + 1,
          '& > svg': {
            width: typography.sizes['tiny'],
          },
        },
      },
      '&$naked': {
        '& ~ $startSvg, & ~ $endSvg': {
          bottom: typography.sizes['tiny'] / 5,
        },
        '& ~ $startSvg': {
          left: 0,
        },
        '& ~ $endSvg': {
          right: 0,
        },
      },
      '&$naked$dense': {
        '& ~ $startSvg, & ~ $endSvg': {
          bottom: typography.sizes['tiny'] / 2,
        },
      },
    },
    '&$startSvg': {
      paddingLeft: typography.sizes['small'] + spacing('small'),
      '& ~ $startSvg': {
        left: spacing('tiny') + 0.5,
      },
      '&$dense': {
        paddingLeft: typography.sizes['tiny'] + spacing('tiny'),
        '& ~ $startSvg': {
          left: spacing('tiny') / 2 + 0.5,
        },
      },
    },
    '&$endSvg': {
      paddingRight: typography.sizes['small'] * 2,
      '& ~ $endSvg': {
        right: spacing('tiny'),
      },
      '&$dense': {
        paddingRight: typography.sizes['tiny'] * 2 - 2,
        '& ~ $endSvg': {
          right: spacing('tiny') - 2,
        },
      },
    },
  },
  label: {},
  dense: {},
  naked: {},
  startSvg: {},
  endSvg: {},
  disabled: {},
}));

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  label?: React.ReactNode;
  dense?: boolean;
  naked?: boolean;
  startSvg?: React.ReactNode;
  endSvg?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps & WithStyles<typeof styles>>(
  function Input(props, ref) {
    const { classes, className, label, dense, naked, disabled, startSvg, endSvg, ...rest } = props;

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
            startSvg && classes.startSvg,
            endSvg && classes.endSvg,
            disabled && classes.disabled,
          )}
        />
        {label && (
          <Label className={clsx(classes.label, dense && classes.dense, naked && classes.naked)}>
            {label}
          </Label>
        )}
        {startSvg && <span className={classes.startSvg}>{startSvg}</span>}
        {endSvg && <span className={classes.endSvg}>{endSvg}</span>}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Input.displayName = 'Input';
}

const Styled = withStyles(styles)(Input);
export { Styled as Input };
