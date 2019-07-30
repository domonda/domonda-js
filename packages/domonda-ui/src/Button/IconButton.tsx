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

const IconButton: React.FC<IconButtonProps & WithStyles<typeof styles>> = (props) => {
  const { children, classes, className, ...rest } = props;
  return (
    <Button {...rest} className={clsx(iconButtonClassName, classes.root, className)}>
      {children}
    </Button>
  );
};

const StyledIconButton = withStyles(styles)(IconButton);
export { StyledIconButton as IconButton };
