/**
 *
 * Flex
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Space } from '../styles/spacing';

// decorate
import { decorate, Decorate } from './decorate';

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  classes?: Partial<Decorate['classes']>;
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  container?: boolean;
  item?: boolean;
  flex?: number | string;
  wrap?: boolean;
  direction?: React.CSSProperties['flexDirection'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  justifySelf?: React.CSSProperties['justifySelf'];
  alignSelf?: React.CSSProperties['alignSelf'];
  spacing?: Exclude<Space, 'none'>;
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
    wrap,
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

  const derivedStyle = useMemo(() => {
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
      width: fill ? (spacing ? `calc(100% + ${theme.spacing(spacing)}px)` : '100%') : undefined,
      height: fill ? (spacing ? `calc(100% + ${theme.spacing(spacing)}px)` : '100%') : undefined,
      ...style,
    };
  }, [
    theme,
    flex,
    direction,
    justify,
    align,
    justifySelf,
    alignSelf,
    minWidth,
    maxWidth,
    fill,
    spacing,
    style,
  ]);

  return (
    <Component
      {...rest}
      ref={ref as any}
      className={
        clsx(
          container && classes.container,
          item && classes.item,
          wrap && classes.wrap,
          spacing && classes[`spacing-${spacing}` as keyof typeof classes],
          overflowing && classes.overflowing,
          zeroMinWidth && classes.zeroMinWidth,
          className,
        ) || undefined
      }
      style={derivedStyle}
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
