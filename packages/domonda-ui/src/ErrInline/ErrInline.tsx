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
  error: Error;
  onClose?: () => void;
}

const ErrInline: React.FC<ErrInlineProps & Decorate> = (props) => {
  const { classes, className, error, onClose, ...rest } = props;
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <pre className={classes.message}>{error.message}</pre>
      {onClose && (
        <IconButton autoFocus variant="text" color="error" onClick={onClose}>
          <SvgClearIcon />
        </IconButton>
      )}
    </div>
  );
};

const StyledErrInline = decorate(ErrInline);
export { StyledErrInline as ErrInline };
