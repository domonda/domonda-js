/**
 *
 * IconButton
 *
 */

import React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, generateStaticClassName } from '../styles';
import { Button, ButtonProps } from './Button';
import { svgIconClassName } from '../SvgIcon';

const styles = createStyles(({ spacing }) => ({
  root: {
    padding: spacing(0.4, 0.6),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [`& .${svgIconClassName}`]: {
      margin: 0,
    },
  },
}));

export type IconButtonProps = ButtonProps;

export const iconButtonClassName = generateStaticClassName('IconButton');

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps & WithStyles<typeof styles>>(
  function IconButton(props, ref) {
    const { children, classes, className, ...rest } = props;
    return (
      <Button {...rest} ref={ref} className={clsx(iconButtonClassName, classes.root, className)}>
        {children}
      </Button>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  IconButton.displayName = 'IconButton';
}

const StyledIconButton = withStyles(styles)(IconButton);
export { StyledIconButton as IconButton };
