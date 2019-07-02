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

export type SvgIconProps = React.SVGProps<SVGSVGElement>;

export const svgIconClassName = generateStaticClassName('SvgIcon');

const SvgIcon: React.FC<SvgIconProps & WithStyles<typeof styles>> = (props) => {
  const { children, classes, className, ...rest } = props;

  return (
    <svg viewBox="0 0 24 24" {...rest} className={clsx(svgIconClassName, classes.root, className)}>
      {children}
    </svg>
  );
};

const StyledSvgIcon = withStyles(styles)(SvgIcon);
export { StyledSvgIcon as SvgIcon };
