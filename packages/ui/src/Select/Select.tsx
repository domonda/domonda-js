/**
 *
 * Select
 *
 */

import React from 'react';
import clsx from 'clsx';

import { useStyles } from '../styles/treat';
import { Label } from '../Label';

import * as styles from './Select.treat';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  dense?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  readOnly?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(props, ref) {
  const { children, className, dense, disabled, label, readOnly, ...rest } = props;

  const classes = useStyles(styles);

  return (
    <div className={clsx(classes.root, className)}>
      {readOnly ? (
        <input
          ref={ref as any} // it should be fine since both `select` and `input` mostly share same properties
          className={clsx(classes.select, dense && classes.dense, disabled && classes.disabled)}
          disabled={disabled}
          readOnly={readOnly}
          value={rest.value}
        />
      ) : (
        <select
          {...rest}
          ref={ref}
          className={clsx(classes.select, dense && classes.dense, disabled && classes.disabled)}
          disabled={disabled}
        >
          {children}
        </select>
      )}

      {label && <Label className={clsx(classes.label, dense && classes.dense)}>{label}</Label>}

      <div className={clsx(classes.icon, dense && classes.dense)}>
        {/* FontAwesome 5 `caret-down` */}
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          className="svg-inline--fa fa-caret-down fa-w-10"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          />
        </svg>
      </div>
    </div>
  );
});
