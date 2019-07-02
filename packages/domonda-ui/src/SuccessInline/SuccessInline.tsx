/**
 *
 * SuccessInline
 *
 */

import React from 'react';
import clsx from 'clsx';

// ui
import { IconButton } from '../Button/IconButton';
import { SvgClearIcon } from '../SvgIcon/SvgClearIcon';

// decorate
import { decorate, Decorate } from './decorate';

export interface SuccessInlineProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode;
  onClose?: () => void;
}

const SuccessInline: React.FC<SuccessInlineProps & Decorate> = (props) => {
  const { classes, className, message, onClose, ...rest } = props;
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <pre className={classes.message}>{message}</pre>
      {onClose && (
        <IconButton autoFocus variant="text" color="success" onClick={onClose}>
          <SvgClearIcon />
        </IconButton>
      )}
    </div>
  );
};

const StyledSuccessInline = decorate(SuccessInline);
export { StyledSuccessInline as SuccessInline };
