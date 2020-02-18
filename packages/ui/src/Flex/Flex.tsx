/**
 *
 * Flex
 *
 */

import React, { useMemo } from 'react';
import clsx from 'clsx';

import { useStyles, useTheme } from '../styles/treat';
import { SPACE_PREFIX, Space } from '../styles/spacing';

import { styles } from './Flex.treat';

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  align?: React.CSSProperties['alignItems'];
  alignSelf?: React.CSSProperties['alignSelf'];
  autoWidth?: boolean;
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  container?: boolean;
  direction?: React.CSSProperties['flexDirection'];
  fill?: boolean;
  flex?: number | string;
  item?: boolean;
  justify?: React.CSSProperties['justifyContent'];
  justifySelf?: React.CSSProperties['justifySelf'];
  maxWidth?: number | string;
  minWidth?: number | string;
  overflowing?: boolean;
  spacing?: Exclude<Space, 'none'>;
  wrap?: boolean;
  zeroMinWidth?: boolean;
}

export const Flex = React.forwardRef<HTMLElement, FlexProps>(function Flex(props, ref) {
  const {
    children,
    className,
    align,
    alignSelf,
    component: Component = 'div' as React.ElementType<React.ComponentPropsWithRef<'div'>>,
    container,
    direction,
    fill,
    flex,
    item,
    justify,
    justifySelf,
    maxWidth,
    minWidth,
    overflowing,
    spacing,
    style,
    wrap,
    zeroMinWidth,
    ...rest
  } = props;

  const classes = useStyles(styles);
  const theme = useTheme();

  const derivedStyle = useMemo(() => {
    if (
      !align &&
      !alignSelf &&
      !direction &&
      !fill &&
      flex === undefined &&
      !justify &&
      !justifySelf &&
      maxWidth === undefined &&
      minWidth === undefined &&
      !style
    ) {
      return undefined;
    }

    return {
      alignItems: align,
      alignSelf,
      height: fill ? (spacing ? `calc(100% + ${theme.spacing(spacing)}px)` : '100%') : undefined,
      justifyContent: justify,
      justifySelf,
      flex,
      flexDirection: direction,
      maxWidth,
      minWidth,
      width: fill ? (spacing ? `calc(100% + ${theme.spacing(spacing)}px)` : '100%') : undefined,
      ...style,
    };
  }, [
    align,
    alignSelf,
    direction,
    fill,
    flex,
    justify,
    justifySelf,
    maxWidth,
    minWidth,
    spacing,
    style,
    theme,
  ]);

  return (
    <Component
      {...rest}
      ref={ref as any}
      className={
        clsx(
          container && classes.container,
          item && classes.item,
          spacing && classes[(SPACE_PREFIX + spacing) as keyof typeof classes],
          wrap && classes.wrap,
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
