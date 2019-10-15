/**
 *
 * Paper
 *
 */

import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles } from '../styles';

const styles = createStyles((theme) => {
  const elevations: { [key: string]: any } = {};
  theme.shadows.forEach((shadow, index) => {
    elevations[`elevation${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    /* Styles applied to the root element. */
    root: {
      backgroundColor: theme.palette.surface,
      color: theme.palette.textPrimary,
      transition: theme.transition.create('box-shadow'),
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: theme.shape.borderRadius,
    },
    ...elevations,
  };
});

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  elevation?: number;
  square?: boolean;
}

const Paper = React.forwardRef<HTMLDivElement, PaperProps & WithStyles<typeof styles>>(
  function Paper(props, ref) {
    const {
      classes,
      className: classNameProp,
      component: Component = 'div' as any,
      square = false,
      elevation = 1,
      ...other
    } = props;

    const className = clsx(
      classes.root,
      classes[`elevation${elevation}` as keyof typeof classes],
      {
        [classes.rounded]: !square,
      },
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
