/**
 *
 * ButtonGroup
 *
 */

import React from 'react';
import { createStyles, withStyles, WithStyles } from '../styles';
import { buttonClassName } from './Button';
import clsx from 'clsx';

const styles = createStyles(({ shape, shadows }) => ({
  root: {
    display: 'inline-flex',
    flexWrap: 'nowrap',
    boxShadow: shadows.line,
    borderRadius: shape.borderRadius.small,
    [`& > .${buttonClassName}`]: {
      flex: 1,
      boxShadow: 'none',
      borderRadius: 0,
      '&:not(:last-child)': {
        borderRight: 0,
      },
      '&:first-child': {
        borderTopLeftRadius: shape.borderRadius.small,
        borderBottomLeftRadius: shape.borderRadius.small,
      },
      '&:last-child': {
        borderTopRightRadius: shape.borderRadius.small,
        borderBottomRightRadius: shape.borderRadius.small,
      },
    },
  },
}));

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: WithStyles<typeof styles>['classes'];
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps & WithStyles<typeof styles>>(
  function ButtonGroup(props, ref) {
    const { children, className, classes, ...rest } = props;
    return (
      <div {...rest} ref={ref} className={clsx(classes.root, className)}>
        {children}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  ButtonGroup.displayName = 'ButtonGroup';
}

const StyledButtonGroup = withStyles(styles)(ButtonGroup);
export { StyledButtonGroup as ButtonGroup };
