/**
 *
 * Svg
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Color, ColorVariant, TypographySize } from '../styles';

// decorate
import { decorate, Decorate } from './decorate';

export interface SvgProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Partial<Decorate['classes']>;
  color?: 'inherit' | Color; // default: `textDark`
  colorVariant?: ColorVariant;
  size?: TypographySize; // default: `small`
  component?: keyof React.ReactHTML;
}

const Svg = React.forwardRef<HTMLElement, SvgProps & Decorate>(function Svg(props, ref) {
  const {
    children,
    theme,
    classes,
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
      className={clsx(classes.root, classes[`size-${size}` as keyof typeof classes], className)}
      style={derivedStyle}
    >
      {children}
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Svg.displayName = 'Svg';
}

const StyledSvg = decorate(Svg);
export { StyledSvg as Svg };
