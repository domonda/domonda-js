/**
 *
 * Flex
 *
 */

import React from 'react';
import clsx from 'clsx';

// decorate
import { decorate, Decorate } from './decorate';

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Decorate['classes'];
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  container?: boolean;
  item?: boolean;
  flex?: number | string;
  noWrap?: boolean;
  direction?: React.CSSProperties['flexDirection'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  justifySelf?: React.CSSProperties['justifySelf'];
  alignSelf?: React.CSSProperties['alignSelf'];
  spacing?: 1 | 2 | 3 | 4;
  minWidth?: number | string;
  maxWidth?: number | string;
  autoWidth?: boolean;
  fill?: boolean;
  overflowing?: boolean;
  zeroMinWidth?: boolean;
}

const Flex = React.forwardRef<HTMLElement, FlexProps & Decorate>(function Flex(props, ref) {
  const {
    children,
    theme,
    classes,
    className,
    component: Component = 'div' as React.ElementType<React.ComponentPropsWithRef<'div'>>,
    container,
    item,
    flex,
    noWrap,
    direction,
    justify,
    align,
    justifySelf,
    alignSelf,
    spacing,
    minWidth,
    maxWidth,
    overflowing,
    fill,
    style,
    zeroMinWidth,
    ...rest
  } = props;

  function deriveStyle() {
    if (
      flex === undefined &&
      !direction &&
      !justify &&
      !align &&
      !justifySelf &&
      !alignSelf &&
      minWidth === undefined &&
      maxWidth === undefined &&
      !fill &&
      !style
    ) {
      return undefined;
    }

    return {
      flex,
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      justifySelf,
      alignSelf,
      minWidth,
      maxWidth,
      width: fill ? (spacing ? `calc(100% + ${theme.spacing(spacing)})` : '100%') : undefined,
      height: fill ? (spacing ? `calc(100% + ${theme.spacing(spacing)})` : '100%') : undefined,
      ...style,
    };
  }

  return (
    <Component
      {...rest}
      ref={ref as any}
      className={
        clsx(
          container && classes.container,
          item && classes.item,
          noWrap && classes.noWrap,
          spacing && classes[`spacing-${spacing}` as keyof typeof classes],
          overflowing && classes.overflowing,
          zeroMinWidth && classes.zeroMinWidth,
          className,
        ) || undefined
      }
      style={deriveStyle()}
    >
      {children}
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Flex.displayName = 'Flex';
}

const StyledFlex = decorate(Flex);
export { StyledFlex as Flex };
