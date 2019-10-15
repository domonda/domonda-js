/**
 *
 * SvgIcon
 *
 */

import * as React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, generateStaticClassName } from '../styles';

const styles = {
  root: {
    fill: 'currentColor',
    width: '1em',
    height: '1em',
    flexShrink: 0,
    display: 'inline-block',
    fontSize: 24,
  },
};

export interface SvgIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  classes?: Partial<WithStyles<typeof styles>['classes']>;
}

export const svgIconClassName = generateStaticClassName('SvgIcon');

const SvgIcon = React.forwardRef<SVGSVGElement, SvgIconProps & WithStyles<typeof styles>>(
  function SvgIcon(props, ref) {
    const { children, classes, className, ...rest } = props;
    return (
      <svg
        viewBox="0 0 24 24"
        {...rest}
        className={clsx(svgIconClassName, classes.root, className)}
        ref={ref}
      >
        {children}
      </svg>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  SvgIcon.displayName = 'SvgIcon';
}

const StyledSvgIcon = withStyles(styles)(SvgIcon);
export { StyledSvgIcon as SvgIcon };
