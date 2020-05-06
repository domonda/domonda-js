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
    letterSpacing: 0.6,
    color: palette.secondary,
  },
  block: {
    display: 'block',
  },
  inline: {
    display: 'inline-flex',
  },
}));

export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  classes?: WithStyles<typeof styles>['classes'];
  inline?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps & WithStyles<typeof styles>>(
  function Label(props, ref) {
    const { children, classes, className, inline, ...rest } = props;
    return (
      <label
        {...rest}
        className={clsx(classes.root, inline ? classes.inline : classes.block, className)}
        ref={ref}
      >
        {children}
      </label>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Label.displayName = 'Label';
}

const StyledLabel = withStyles(styles)(Label);
export { StyledLabel as Label };
