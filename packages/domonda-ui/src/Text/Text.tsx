/**
 *
 * Text
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
  Color,
  ColorVariant,
  TypographyFont,
  TypographyWeight,
  TypographyVariant,
} from '../styles';

// decorate
import { decorate, Decorate } from './decorate';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Decorate['classes'];
  inline?: boolean;
  gutterBottom?: boolean;
  paragraph?: boolean;
  color?: 'inherit' | Color; // default: `textPrimary`
  colorVariant?: ColorVariant;
  variant?: TypographyVariant; // default: `body`
  weight?: TypographyWeight;
  font?: TypographyFont;
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
    color = 'textPrimary',
    colorVariant,
    variant = 'body',
    weight,
    font,
    style,
    component: PropComponent,
    ...rest
  } = props;

  const Component = useMemo(() => {
    if (PropComponent) {
      return PropComponent as any;
    }

    switch (variant) {
      case 'title':
        return 'h3';
      case 'subtitle':
        return 'h5';
      case 'body':
        return 'p';
      case 'caption':
        return 'span';
      default:
        return 'span';
    }
  }, [PropComponent, variant]);

  function deriveStyle() {
    const manipulator = colorVariant
      ? theme.palette[colorVariant]
      : (color: Color) => theme.palette[color];
    return { color: color === 'inherit' ? 'inherit' : manipulator(color), ...style };
  }

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        classes.root,
        inline ? classes.inline : classes.block,
        (gutterBottom || paragraph) && classes.gutterBottom,
        classes[`variant-${variant}` as keyof typeof classes],
        weight && classes[`weight-${weight}` as keyof typeof classes],
        font && classes[`font-${font}` as keyof typeof classes],
        className,
      )}
      style={deriveStyle()}
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
