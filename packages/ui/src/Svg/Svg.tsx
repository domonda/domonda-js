/**
 *
 * Svg
 *
 */

import React from 'react';
import clsx from 'clsx';
import { Color } from '../styles/palette';
import { Size } from '../styles/sizes';
import { useStyles } from 'react-treat';
import * as classesRef from './Svg.treat';

export interface SvgProps extends React.SVGProps<SVGSVGElement> {
  color?: 'inherit' | Color; // default: `inherit`
  size?: Size; // default: `regular`
}

export const Svg = React.forwardRef<SVGSVGElement, SvgProps>(function Svg(props, ref) {
  const { children, className, color = 'inherit', size = 'regular', style, ...rest } = props;
  const classes = useStyles(classesRef);

  return (
    <svg {...rest} ref={ref} className={clsx(classes.root, classes.sizes[size], className)}>
      {children}
    </svg>
  );
});
