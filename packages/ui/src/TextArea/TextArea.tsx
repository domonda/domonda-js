/**
 *
 * TextArea
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
  textArea: {
    // reset
    margin: 0,
    display: 'inherit',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    outline: 0,
    backgroundClip: 'padding-box',
    WebkitAppearance: 'none',
    // ./reset
    ...typography.variant('small'),
    minWidth: 256,
    minHeight: spacing('tiny') * 6,
    textAlign: 'inherit',
    color: palette.textDark,
    backgroundColor: palette.white,
    border: `1px solid ${palette.border}`,
    borderRadius: shape.borderRadius.tiny,
    boxShadow: shadows.line,
    padding: spacing('tiny') - 2.5,
    '&$dense': {
      padding: spacing('tiny') / 2 + 0.5,
    },
    '&::placeholder': {
      color: palette.light('textDark'),
    },
    '&:invalid': {
      borderColor: palette.warning,
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
    },
  },
  label: {},
  dense: {},
  disabled: {},
}));

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  label?: React.ReactNode;
  dense?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps & WithStyles<typeof styles>>(
  function TextArea(props, ref) {
    const { classes, className, label, dense, disabled, ...rest } = props;
    return (
      <div className={clsx(classes.root, className)}>
        <textarea
          {...rest}
          ref={ref}
          disabled={disabled}
          className={clsx(classes.textArea, dense && classes.dense, disabled && classes.disabled)}
        />
        {label && <Label className={clsx(classes.label, dense && classes.dense)}>{label}</Label>}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  TextArea.displayName = 'TextArea';
}

const Styled = withStyles(styles)(TextArea);
export { Styled as TextArea };
