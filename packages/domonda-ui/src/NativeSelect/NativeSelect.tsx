import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '../styles';
import clsx from 'clsx';
import { svgIconClassName } from '../SvgIcon';
import { SvgExpandMoreIcon } from '../SvgIcon/SvgExpandMoreIcon';

const styles = createStyles(({ typography, palette, spacing, shape }) => ({
  root: {
    position: 'relative',
    width: '100%',
    border: `1px solid ${palette.border}`,
    borderRadius: shape.borderRadius,
    overflow: 'hidden',
  },
  select: {
    position: 'relative',
    zIndex: 2,
    fontSize: 'inherit',
    fontFamily: 'inherit',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    userSelect: 'none',
    borderRadius: 0, // Reset
    lineHeight: '24px',
    minWidth: 16,
    width: '100%',
    paddingTop: spacing(2),
    paddingRight: spacing(4),
    paddingBottom: spacing(0.5),
    paddingLeft: spacing(1),
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    '&::-ms-expand': {
      display: 'none',
    },
    '&$disabled': {
      cursor: 'default',
      color: palette.textSecondary,
    },
    '&:focus, &:active': {
      outline: 'none',
      backgroundColor: palette.surface,
      '& + $label': {
        zIndex: 2,
      },
      '& + $label + $icon': {
        zIndex: 2,
      },
    },
    '&:active': {
      [`& + $label + $icon > .${svgIconClassName}`]: {
        transform: 'rotate(-180deg)',
      },
    },
  },
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: spacing(),
    display: 'inline-flex',
    alignItems: 'center',
    [`& > .${svgIconClassName}`]: {
      color: palette.textPrimary,
      transition: 'transform 100ms',
    },
  },
  label: {
    alignItems: 'flex-start',
    bottom: 0,
    color: palette.dark('textSecondary'),
    display: 'inline-flex',
    fontSize: '.75rem',
    fontWeight: typography.weights.semiBold,
    lineHeight: 1,
    paddingBottom: spacing(0.5),
    paddingTop: spacing(0.5),
    position: 'absolute',
    left: spacing(),
    textTransform: 'uppercase',
    top: 0,
    zIndex: 0,
  },
  disabled: {},
}));

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
}

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  NativeSelectProps & WithStyles<typeof styles>
>(function NativeSelect(props, ref) {
  const { children, classes, className, label, disabled, ...rest } = props;
  return (
    <div className={clsx(classes.root, className)}>
      <select
        {...rest}
        disabled={disabled}
        className={clsx({ [classes.disabled]: disabled }, classes.select)}
        ref={ref}
      >
        {children}
      </select>
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.icon}>
        <SvgExpandMoreIcon />
      </div>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  NativeSelect.displayName = 'NativeSelect';
}

const StyledNativeSelect = withStyles(styles)(NativeSelect);
export { StyledNativeSelect as NativeSelect };
