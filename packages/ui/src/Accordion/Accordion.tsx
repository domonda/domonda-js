/**
 *
 * Accordion
 *
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';

import { Svg } from '../Svg';

import { styles } from './Accordion.treat';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  initiallyOpen?: boolean;
  label: React.ReactNode;
  open?: boolean;
  onSetOpen?: (open: boolean) => void;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function Accorodion(
  props,
  ref,
) {
  const {
    children,
    className,
    initiallyOpen,
    label,
    open: externalOpen,
    onSetOpen,
    ...rest
  } = props;

  const classes = useStyles(styles);

  const [open, setOpen] = useState<boolean>(
    externalOpen !== undefined ? externalOpen : !!initiallyOpen,
  );

  useEffect(() => {
    if (externalOpen !== undefined && externalOpen !== open) {
      setOpen(externalOpen);
    }
  }, [externalOpen, open]);

  return (
    <div {...rest} ref={ref} className={clsx(classes.root, open && classes.open, className)}>
      <button
        className={classes.button}
        onClick={() =>
          externalOpen !== undefined ? onSetOpen && onSetOpen(!open) : setOpen((open) => !open)
        }
      >
        <div className={classes.labelContent}>{label}</div>

        <div className={classes.labelIcon}>
          <Svg color="gray30">
            {open ? (
              <svg
                aria-hidden="true"
                className="svg-inline--fa fa-chevron-up fa-w-14"
                data-icon="chevron-up"
                data-prefix="far"
                focusable="false"
                role="img"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.101 359.293L25.9 379.092c4.686 4.686 12.284 4.686 16.971 0L224 198.393l181.13 180.698c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 132.908c-4.686-4.686-12.284-4.686-16.971 0L6.101 342.322c-4.687 4.687-4.687 12.285 0 16.971z"
                  fill="currentColor"
                ></path>
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="svg-inline--fa fa-chevron-down fa-w-14"
                data-icon="chevron-down"
                data-prefix="far"
                focusable="false"
                role="img"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
          </Svg>
        </div>
      </button>

      {open && <div className={classes.content}>{children}</div>}
    </div>
  );
});
