/**
 *
 * Autocomplete
 *
 */

import React, { useRef, useCallback } from 'react';
import Downshift, { DownshiftProps } from 'downshift';
import { FixedSizeList } from 'react-window';

// ui
import { Input, InputProps } from '../Input';
import { Popper, PopperProps } from '../Popper';
import { MenuList, MenuListProps, MenuItem, MenuItemProps } from '../Menu';
import { Paper, PaperProps } from '../Paper';

const ITEM_SIZE = 36;
const ITEMS_FIT = 8; // how many items should fit the open list

export type AutocompleteGetItemId<T> = (item: T | null) => string;

export type AutocompleteItemToString<T> = (item: T | null) => string;

export interface AutocompleteProps<T>
  extends Omit<DownshiftProps<T>, 'onInputValueChange' | 'getItemId' | 'children'> {
  readonly items: readonly T[];
  getItemId?: (item: T | null) => string;
  onInputValueChange?: (value: string | null) => void;
  listWidth?: number;
  listHeight?: number;
  // Input
  label?: React.ReactNode;
  placeholder?: string;
  dense?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  InputProps?: InputProps;
  // Popper
  keepPopperMounted?: boolean;
  PopperProps?: Omit<PopperProps, 'open' | 'anchorEl'>;
  inlineMenu?: boolean; // disables popper
  // Paper
  PaperProps?: PaperProps;
  // Menu
  MenuListProps?: MenuListProps;
  MenuItemProps?: MenuItemProps;
}

export function Autocomplete<T>(props: AutocompleteProps<T>): React.ReactElement | null {
  const {
    items,
    getItemId = (item: T) => (typeof item === 'string' ? item : JSON.stringify(item)),
    onInputValueChange,
    listWidth,
    listHeight,
    // Input
    label,
    placeholder,
    dense,
    required,
    disabled,
    readOnly,
    autoFocus,
    InputProps = {},
    // Popper
    keepPopperMounted,
    PopperProps = {},
    inlineMenu,
    // Paper
    PaperProps,
    // Menu
    MenuListProps,
    MenuItemProps = {},
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
            if (InputProps.onFocus) {
              InputProps.onFocus(event);
            }
            openMenu();
          },
        });

        const isOpen = downshiftIsOpen && items.length > 0;

        const content = (
          <Paper bordered shadow="small" {...PaperProps}>
            <MenuList
              {...(isOpen
                ? getMenuProps(
                    {
                      ...MenuListProps,
                      style: { padding: 0, ...(MenuListProps || {}).style },
                    },
                    { suppressRefError: true },
                  )
                : {})}
            >
              <FixedSizeList
                width={
                  typeof listWidth === 'number'
                    ? listWidth
                    : anchorEl.current
                    ? anchorEl.current.clientWidth
                    : 0
                }
                height={
                  typeof listHeight === 'number'
                    ? listHeight
                    : Math.min(ITEM_SIZE * ITEMS_FIT, items.length * ITEM_SIZE)
                }
                itemSize={ITEM_SIZE}
                itemCount={items.length}
              >
                {({ index, style }) => {
                  const item = items[index];
                  return (
                    <MenuItem
                      {...getItemProps({
                        ...MenuItemProps,
                        index,
                        item,
                        selected:
                          (selectedItem && getItemId(selectedItem) === getItemId(item)) || false,
                        tabIndex: -1,
                        style: {
                          ...style,
                          // reset top-bottom padding to accomodate size
                          paddingTop: 0,
                          paddingBottom: 0,
                          // override with explicit MenuItemProps styles
                          ...MenuItemProps.style,
                        },
                      })}
                      highlighted={highlightedIndex === index}
                    >
                      {itemToString(item)}
                    </MenuItem>
                  );
                }}
              </FixedSizeList>
            </MenuList>
          </Paper>
        );

        return (
          <div>
            <Input
              label={label}
              placeholder={placeholder}
              dense={dense}
              {...InputProps}
              {...restInputProps}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              autoFocus={autoFocus}
              ref={ref as React.Ref<HTMLInputElement>}
            />
            {!readOnly &&
              (keepPopperMounted || isOpen) &&
              (inlineMenu ? (
                content
              ) : (
                <Popper {...PopperProps} open={isOpen} anchorEl={anchorEl.current}>
                  {content}
                </Popper>
              ))}
          </div>
        );
      }}
    </Downshift>
  );
}
