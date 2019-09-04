/**
 *
 * ErrInline
 *
 */

import React from 'react';
import clsx from 'clsx';

// ui
import { IconButton } from '../Button';
import { SvgClearIcon } from '../SvgIcon/SvgClearIcon';

// decorate
import { decorate, Decorate } from './decorate';

export interface ErrInlineProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: Decorate['classes'];
  error: Error;
  onClose?: () => void;
}

const ErrInline = React.forwardRef<HTMLDivElement, ErrInlineProps & Decorate>(function ErrInline(
  props,
  ref,
) {
  const { classes, className, error, onClose, ...rest } = props;
  return (
    <div {...rest} ref={ref} className={clsx(classes.root, className)}>
      <pre className={classes.message}>{error.message}</pre>
      {onClose && (
        <IconButton autoFocus variant="text" color="error" onClick={onClose}>
          <SvgClearIcon />
        </IconButton>
      )}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  ErrInline.displayName = 'ErrInline';
}

const StyledErrInline = decorate(ErrInline);
export { StyledErrInline as ErrInline };
