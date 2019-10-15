/**
 *
 * Autocomplete
 *
 */

import React, { useRef, useCallback } from 'react';
import Downshift, { DownshiftProps } from 'downshift';
import { FixedSizeList } from 'react-window';

// ui
import { TextField, TextFieldProps } from '../TextField';
import { Popper, PopperProps } from '../Popper';
import { Menu, MenuItem } from '../Menu';

const ITEM_SIZE = 46;

const MENU_STYLES = {
  marginTop: 5,
  padding: 0,
};

export type AutocompleteGetItemId<T> = (item: T | null) => string;

export type AutocompleteItemToString<T> = (item: T | null) => string;

export interface AutocompleteProps<T>
  extends Omit<DownshiftProps<T>, 'onInputValueChange' | 'getItemId' | 'children'> {
  readonly items: readonly T[];
  getItemId?: (item: T | null) => string;
  onInputValueChange?: (value: string | null) => void;
  menuWidth?: number;
  menuHeight?: number;
  // TextField
  label?: React.ReactNode;
  dense?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  TextFieldProps?: TextFieldProps;
  PopperProps?: Omit<PopperProps, 'open' | 'anchorEl'>;
  keepPopperMounted?: boolean;
}

export function Autocomplete<T>(props: AutocompleteProps<T>): React.ReactElement | null {
  const {
    items,
    getItemId = (item: T) => (typeof item === 'string' ? item : JSON.stringify(item)),
    onInputValueChange,
    menuWidth,
    menuHeight,
    // TextField
    label,
    dense,
    required,
    disabled,
    readOnly,
    autoFocus,
    TextFieldProps = {},
    PopperProps = {},
    keepPopperMounted,
    ...rest
  } = props;

  const handleInputValueChange = useCallback(
    (value: string) => {
      if (onInputValueChange) {
        onInputValueChange(value || null);
      }
    },
    [onInputValueChange],
  );

  const anchorEl = useRef<HTMLElement | null>(null);

  return (
    <Downshift defaultHighlightedIndex={0} {...rest} onInputValueChange={handleInputValueChange}>
      {({
        getInputProps,
        openMenu,
        getMenuProps,
        isOpen: downshiftIsOpen,
        getItemProps,
        itemToString,
        highlightedIndex,
        selectedItem,
      }) => {
        const { ref, ...restInputProps } = getInputProps({
          ref: anchorEl,
          onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
            if (TextFieldProps.onFocus) {
              TextFieldProps.onFocus(event);
            }
            openMenu();
          },
        });

        const isOpen = downshiftIsOpen && items.length > 0;

        return (
          <div>
            <TextField
              label={label}
              dense={dense}
              {...TextFieldProps}
              {...restInputProps}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              autoFocus={autoFocus}
              ref={ref as React.Ref<HTMLInputElement>}
            />
            {!readOnly && (keepPopperMounted || isOpen) && (
              <Popper {...PopperProps} open={isOpen} anchorEl={anchorEl.current}>
                <Menu
                  {...(isOpen
                    ? getMenuProps(
                        {
                          style: MENU_STYLES,
                        },
                        { suppressRefError: true },
                      )
                    : {})}
                >
                  <FixedSizeList
                    width={
                      typeof menuWidth === 'number'
                        ? menuWidth
                        : anchorEl.current
                        ? anchorEl.current.clientWidth
                        : 0
                    }
                    height={
                      typeof menuHeight === 'number'
                        ? menuHeight
                        : Math.min(ITEM_SIZE * 7, items.length * ITEM_SIZE)
                    }
                    itemSize={ITEM_SIZE}
                    itemCount={items.length}
                  >
                    {({ index, style }) => {
                      const item = items[index];
                      return (
                        <MenuItem
                          {...getItemProps({
                            index,
                            item,
                            selected: selectedItem === getItemId(item),
                            tabIndex: -1,
                            style,
                          })}
                          highlighted={highlightedIndex === index}
                        >
                          {itemToString(item)}
                        </MenuItem>
                      );
                    }}
                  </FixedSizeList>
                </Menu>
              </Popper>
            )}
          </div>
        );
      }}
    </Downshift>
  );
}
