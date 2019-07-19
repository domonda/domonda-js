/**
 *
 * Autocomplete
 *
 */

import React, { useRef, useCallback } from 'react';
import Downshift, { DownshiftProps } from 'downshift';
import { AutoSizer, List } from 'react-virtualized';

// ui
import { TextField, TextFieldProps } from '../TextField';
import { Popper } from '../Popper';
import { Menu, MenuItem } from '../Menu';

export type AutocompleteGetItemId<T> = (item: T | null) => string;

export type AutocompleteItemToString<T> = (item: T | null) => string;

export interface AutocompleteProps<T>
  extends Omit<DownshiftProps<T>, 'onInputValueChange' | 'getItemId' | 'children'> {
  readonly items: readonly T[];
  getItemId?: (item: T | null) => string;
  onInputValueChange?: (value: string | null) => void;
  // TextField
  label?: React.ReactNode;
  dense?: boolean;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  TextFieldProps?: TextFieldProps;
}

function Autocomplete<T>(props: AutocompleteProps<T>): React.ReactElement | null {
  const {
    items,
    getItemId = (item: T) => (typeof item === 'string' ? item : JSON.stringify(item)),
    onInputValueChange,
    // TextField
    label,
    dense,
    required,
    disabled,
    autoFocus,
    TextFieldProps,
    ...rest
  } = props;

  const textFieldProps = TextFieldProps || {};
  const rowHeight = 46;

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
        isOpen,
        getItemProps,
        itemToString,
        highlightedIndex,
        selectedItem,
      }) => {
        const { ref, ...restInputProps } = getInputProps({
          ref: anchorEl,
          onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
            if (textFieldProps.onFocus) {
              textFieldProps.onFocus(event);
            }
            openMenu();
          },
        });

        return (
          <div>
            <TextField
              label={label}
              dense={dense}
              {...textFieldProps}
              {...restInputProps}
              required={required}
              disabled={disabled}
              autoFocus={autoFocus}
              ref={ref as React.Ref<HTMLInputElement>}
            />
            <AutoSizer disableHeight>
              {({ width }) => (
                <Popper
                  open={isOpen && items.length > 0}
                  anchorEl={anchorEl.current}
                  placement="bottom-start"
                  modifiers={{
                    flip: {
                      enabled: true,
                    },
                    preventOverflow: {
                      enabled: true,
                      boundariesElement: 'scrollParent',
                    },
                  }}
                >
                  <Menu
                    {...getMenuProps(
                      {
                        style: {
                          marginTop: 5,
                          padding: 0,
                          width,
                        },
                      },
                      { suppressRefError: true },
                    )}
                  >
                    <List
                      width={width}
                      height={Math.min(rowHeight * 7, items.length * rowHeight)}
                      tabIndex={-1}
                      rowHeight={rowHeight}
                      rowCount={items.length}
                      scrollToIndex={
                        !highlightedIndex && highlightedIndex !== 0 ? undefined : highlightedIndex
                      }
                      rowRenderer={({ key, index, style }) => {
                        const item = items[index];
                        const itemId = getItemId(item);
                        return (
                          <MenuItem
                            {...getItemProps({
                              key,
                              index,
                              item,
                              selected: selectedItem === itemId,
                              tabIndex: -1,
                              style,
                            })}
                            highlighted={highlightedIndex === index}
                          >
                            {itemToString(item)}
                          </MenuItem>
                        );
                      }}
                    />
                  </Menu>
                </Popper>
              )}
            </AutoSizer>
          </div>
        );
      }}
    </Downshift>
  );
}

const ComposedAutocomplete = Autocomplete;
export { ComposedAutocomplete as Autocomplete };
