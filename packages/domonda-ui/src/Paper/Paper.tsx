/**
 *
 * Paper
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles } from '../styles';
import { Shadow, SHADOWS } from '../styles/shadows';

const styles = createStyles(({ shape, palette, shadows }) => ({
  /* Styles applied to the root element. */
  root: {
    backgroundColor: palette.surface,
    color: palette.textPrimary,
  },
  /* Styles applied to the root element if `square={false}`. */
  rounded: {
    borderRadius: shape.borderRadius,
  },
  bordered: {
    border: `1px solid ${palette.border}`,
  },
  // shadow-{shadow}
  ...SHADOWS.reduce(
    (acc, shadow) => ({
      ...acc,
      [`shadow-${shadow}`]: {
        boxShadow: shadows[shadow],
      },
    }),
    {},
  ),
}));

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  shadow?: Shadow;
  square?: boolean;
  bordered?: boolean;
}

const Paper = React.forwardRef<HTMLDivElement, PaperProps & WithStyles<typeof styles>>(
  function Paper(props, ref) {
    const {
      classes,
      className: classNameProp,
      component: Component = 'div' as any,
      square = false,
      shadow = 'line',
      bordered,
      ...other
    } = props;

    const className = clsx(
      classes.root,
      classes[`shadow-${shadow}` as keyof typeof classes],
      {
        [classes.rounded]: !square,
      },
      bordered && classes.bordered,
      classNameProp,
    );

    return <Component className={className} ref={ref} {...other} />;
  },
);

if (process.env.NODE_ENV !== 'production') {
  Paper.displayName = 'Paper';
}

const StyledPaper = withStyles(styles)(Paper);
export { StyledPaper as Paper };
