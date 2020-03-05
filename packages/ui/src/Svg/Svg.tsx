/**
 *
 * Svg
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';

import { useStyles, useTheme } from '../styles/treat';
import { Color, ColorVariant } from '../styles/palette';
import { TypographySize } from '../styles/typography';

import * as styles from './Svg.treat';

export interface SvgProps extends React.HTMLAttributes<HTMLElement> {
  component?: keyof React.ReactHTML;
  color?: 'inherit' | Color; // default: `textDark`
  colorVariant?: ColorVariant;
  size?: TypographySize; // default: `small`
}

export const Svg = React.forwardRef<HTMLElement, SvgProps>(function Svg(props, ref) {
  const {
    children,
    component: PropComponent,
    className,
    color = 'textDark',
    colorVariant,
    size = 'small',
    style,
    ...rest
  } = props;

  const classes = useStyles(styles);
  const theme = useTheme();

  const Component = useMemo(() => {
    if (PropComponent) {
      return PropComponent as any;
    }
    return 'span';
  }, [PropComponent]);

  const derivedStyle = useMemo(() => {
    const manipulator = colorVariant
      ? theme.palette[colorVariant]
      : (color: Color) => theme.palette[color];
    return { color: color === 'inherit' ? 'inherit' : manipulator(color), ...style };
  }, [theme, color, colorVariant, style]);

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(classes.root, classes.sizes[size], className)}
      style={derivedStyle}
    >
      {children}
    </Component>
  );
});
