/**
 *
 * Svg
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Color, ColorVariant, TypographySize } from '../styles';
import { useTheme, useStyles } from '../styles/treat';
import { styles } from './Svg.treat';

export interface SvgProps extends React.HTMLAttributes<HTMLElement> {
  color?: 'inherit' | Color; // default: `textDark`
  colorVariant?: ColorVariant;
  size?: TypographySize; // default: `small`
  component?: keyof React.ReactHTML;
}

export const Svg = React.forwardRef<HTMLElement, SvgProps>(function Svg(props, ref) {
  const {
    children,
    className,
    color = 'textDark',
    colorVariant,
    size = 'small',
    style,
    component: PropComponent,
    ...rest
  } = props;

  const Component = useMemo(() => {
    if (PropComponent) {
      return PropComponent as any;
    }
    return 'span';
  }, [PropComponent]);

  const theme = useTheme();
  const derivedStyle = useMemo(() => {
    const manipulator = colorVariant
      ? theme.palette[colorVariant]
      : (color: Color) => theme.palette[color];
    return { color: color === 'inherit' ? 'inherit' : manipulator(color), ...style };
  }, [theme, color, colorVariant, style]);

  const classes = useStyles(styles);

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(classes.root, classes[`size-${size}` as keyof typeof classes], className)}
      style={derivedStyle}
    >
      {children}
    </Component>
  );
});
