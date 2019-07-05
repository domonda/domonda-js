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

export interface TextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  classes?: Decorate['classes'];
  inline?: boolean;
  gutterBottom?: boolean;
  paragraph?: boolean;
  color?: 'inherit' | Color;
  colorVariant?: ColorVariant;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  font?: TypographyFont;
}

const Text = React.forwardRef<HTMLHeadingElement, TextProps & Decorate>(function Text(props, ref) {
  const {
    children,
    classes,
    className,
    inline,
    gutterBottom,
    paragraph,
    color,
    colorVariant,
    variant,
    weight,
    font,
    ...rest
  } = props;

  const Component = useMemo(() => {
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
  }, [variant]);

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        classes.root,
        (color || colorVariant) && classes.color,
        variant && classes.variant,
        weight && classes.weight,
        font && classes.font,
        inline ? classes.inline : classes.block,
        (gutterBottom || paragraph) && classes.gutterBottom,
        className,
      )}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'Text';

const StyledText = decorate(Text);
export { StyledText as Text };
