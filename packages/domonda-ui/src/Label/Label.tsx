/**
 *
 * Label
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles(({ typography, palette }) => ({
  root: {
    ...typography.variant('tiny', 'medium'),
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: palette.secondary,
  },
}));

export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  classes?: WithStyles<typeof styles>['classes'];
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps & WithStyles<typeof styles>>(
  function Label(props, ref) {
    const { children, classes, className, ...rest } = props;
    return (
      <label {...rest} className={clsx(classes.root, className)} ref={ref}>
        {children}
      </label>
    );
  },
);

const StyledLabel = withStyles(styles)(Label);
export { StyledLabel as Label };
