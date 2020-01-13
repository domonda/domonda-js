/**
 *
 * Text
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Color, ColorVariant, TypographySize, TypographyWeight, TypographyFont } from '../styles';

// decorate
import { decorate, Decorate } from './decorate';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Partial<Decorate['classes']>;
  inline?: boolean;
  gutterBottom?: boolean;
  paragraph?: boolean;
  color?: Color; // default: `textDark`
  colorVariant?: ColorVariant;
  size?: TypographySize; // default: `small`
  weight?: TypographyWeight; // default: `regular`
  font?: TypographyFont;
  withPlaceholder?: boolean;
  wrap?: boolean;
  contained?: boolean;
  inherit?: boolean;
  component?: keyof React.ReactHTML;
}

const Text = React.forwardRef<HTMLElement, TextProps & Decorate>(function Text(props, ref) {
  const {
    children,
    theme,
    classes,
    className,
    inline,
    gutterBottom,
    paragraph,
    color = 'textDark',
    colorVariant,
    size = 'small',
    weight,
    font,
    style,
    withPlaceholder,
    wrap,
    contained,
    inherit,
    component: PropComponent,
    ...rest
  } = props;

  const Component = useMemo(() => {
    if (PropComponent) {
      return PropComponent as any;
    }
    if (paragraph) {
      return 'p';
    }
    return 'span';
  }, [PropComponent, paragraph]);

  const derivedStyle = useMemo(() => {
    const manipulator = colorVariant
      ? theme.palette[colorVariant]
      : (color: Color) => theme.palette[color];
    return { color: inherit ? 'inherit' : manipulator(color), ...style };
  }, [theme, inherit, color, colorVariant, style]);

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        classes.root,
        inline ? classes.inline : classes.block,
        (gutterBottom || paragraph) && classes.gutterBottom,
        classes[`size-${size}` as keyof typeof classes],
        weight && classes[`weight-${weight}` as keyof typeof classes],
        font && classes[`font-${font}` as keyof typeof classes],
        withPlaceholder && classes.withPlaceholder,
        wrap && classes.wrap,
        contained && classes.contained,
        inherit && classes.inherit,
        className,
      )}
      style={derivedStyle}
    >
      {children}
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Text.displayName = 'Text';
}

const StyledText = decorate(Text);
export { StyledText as Text };
