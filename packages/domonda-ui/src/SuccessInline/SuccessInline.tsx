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
  classes?: Decorate['classes'];
  message: React.ReactNode;
  onClose?: () => void;
}

const SuccessInline = React.forwardRef<HTMLDivElement, SuccessInlineProps & Decorate>(
  function SuccessInline(props, ref) {
    const { classes, className, message, onClose, ...rest } = props;
    return (
      <div {...rest} className={clsx(classes.root, className)} ref={ref}>
        <pre className={classes.message}>{message}</pre>
        {onClose && (
          <IconButton autoFocus variant="text" color="success" onClick={onClose}>
            <SvgClearIcon />
          </IconButton>
        )}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  SuccessInline.displayName = 'SuccessInline';
}

const StyledSuccessInline = decorate(SuccessInline);
export { StyledSuccessInline as SuccessInline };
