/**
 *
 * Accordion
 *
 */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

// ui
import { createStyles, withStyles, WithStyles } from '../styles';
import { Svg } from '../Svg';

const styles = createStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '&$open': {
      borderBottom: `1px solid ${palette.gray08}`,
    },
  },
  button: {
    // reset
    border: 0,
    margin: 0,
    width: 'auto',
    overflow: 'visible',
    textAlign: 'inherit',
    background: 'transparent',
    lineHeight: '1em',
    webkitFontSmoothing: 'inherit',
    mozOsxFontSmoothing: 'inherit',
    webkitAppearance: 'none',
    outline: 'none',
    textDecoration: 'none',
    fontSize: 'inherit',
    // ./reset
    display: 'flex',
    padding: spacing('small'),
    cursor: 'pointer',
    '&:focus': {
      outline: `2px solid ${palette.light('primary')}`,
    },
    '&:active': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: palette.lightest('gray08'),
    },
  },
  labelContent: {
    flex: 1,
  },
  labelIcon: {
    marginLeft: spacing('tiny'),
  },
  content: {
    padding: spacing('small'),
    paddingTop: spacing('tiny'),
  },
  open: {},
}));

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label: React.ReactNode;
  initiallyOpen?: boolean;
  open?: boolean;
  onSetOpen?: (open: boolean) => void;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps & WithStyles<typeof styles>>(
  function Accorodion(props, ref) {
    const {
      classes,
      children,
      className,
      label,
      initiallyOpen,
      open: externalOpen,
      onSetOpen,
      ...rest
    } = props;

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
                  focusable="false"
                  data-prefix="far"
                  data-icon="chevron-up"
                  className="svg-inline--fa fa-chevron-up fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M6.101 359.293L25.9 379.092c4.686 4.686 12.284 4.686 16.971 0L224 198.393l181.13 180.698c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 132.908c-4.686-4.686-12.284-4.686-16.971 0L6.101 342.322c-4.687 4.687-4.687 12.285 0 16.971z"
                  ></path>
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="chevron-down"
                  className="svg-inline--fa fa-chevron-down fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
                  ></path>
                </svg>
              )}
            </Svg>
          </div>
        </button>
        {open && <div className={classes.content}>{children}</div>}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Accordion.displayName = 'Accordion';
}

const StyledAccordion = withStyles(styles)(Accordion);
export { StyledAccordion as Accordion };
