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
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  container?: boolean;
  item?: boolean;
  flex?: number | string;
  noWrap?: boolean;
  direction?: React.CSSProperties['flexDirection'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  self?: React.CSSProperties['justifySelf'] & React.CSSProperties['alignSelf'];
  spacing?: number;
  minWidth?: number | string;
  maxWidth?: number | string;
  autoWidth?: boolean;
  fill?: boolean;
  overflowing?: boolean;
}

const Flex = React.forwardRef<HTMLElement, FlexProps & Decorate>(function Flex(props, ref) {
  const {
    children,
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
    self,
    spacing,
    minWidth,
    maxWidth,
    overflowing,
    fill,
    ...rest
  } = props;

  return (
    <Component
      {...rest}
      ref={ref as any}
      className={
        clsx(
          container && classes.container,
          item && classes.item,
          flex && classes.flex,
          noWrap && classes.noWrap,
          direction && classes.direction,
          justify && classes.justify,
          align && classes.align,
          self && classes.self,
          spacing && classes.spacing,
          minWidth && classes.minWidth,
          maxWidth && classes.maxWidth,
          fill && classes.fill,
          overflowing && classes.overflowing,
          className,
        ) || undefined
      }
    >
      {children}
    </Component>
  );
});

const StyledFlex = decorate(Flex);
export { StyledFlex as Flex };
