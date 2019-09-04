/**
 *
 * Autocomplete
 *
 */

import React, { useRef, useCallback } from 'react';
import Downshift, { DownshiftProps } from 'downshift';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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

const ITEM_SIZE = 46;

const POPPER_MODIFIERS = {
  flip: {
    enabled: true,
  },
  preventOverflow: {
    enabled: true,
    boundariesElement: 'scrollParent',
  },
};

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
    TextFieldProps = {},
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
              autoFocus={autoFocus}
              ref={ref as React.Ref<HTMLInputElement>}
            />
            {isOpen && (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Popper
                    open={isOpen}
                    anchorEl={anchorEl.current}
                    placement="bottom-start"
                    modifiers={POPPER_MODIFIERS}
                  >
                    <Menu
                      {...getMenuProps({
                        style: {
                          marginTop: 5,
                          padding: 0,
                          width,
                        },
                      })}
                      component="div"
                    >
                      <FixedSizeList
                        width={width}
                        height={Math.min(ITEM_SIZE * 7, items.length * ITEM_SIZE)}
                        itemSize={ITEM_SIZE}
                        itemCount={items.length}
                      >
                        {({ index, style }) => {
                          const item = items[index];
                          const itemId = getItemId(item);
                          return (
                            <MenuItem
                              {...getItemProps({
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
                      </FixedSizeList>
                    </Menu>
                  </Popper>
                )}
              </AutoSizer>
            )}
          </div>
        );
      }}
    </Downshift>
  );
}

const ComposedAutocomplete = Autocomplete;
export { ComposedAutocomplete as Autocomplete };
