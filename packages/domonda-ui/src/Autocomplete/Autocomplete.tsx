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
import { MenuList, MenuListProps, MenuItem } from '../Menu';
import { Paper, PaperProps } from '../Paper';

const ITEM_SIZE = 46;

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
  dense?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  InputProps?: InputProps;
  // Popper
  keepPopperMounted?: boolean;
  PopperProps?: Omit<PopperProps, 'open' | 'anchorEl'>;
  // Paper
  PaperProps?: PaperProps;
  // MenuList
  MenuListProps?: MenuListProps;
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
    dense,
    required,
    disabled,
    readOnly,
    autoFocus,
    InputProps = {},
    // Popper
    keepPopperMounted,
    PopperProps = {},
    // Paper
    PaperProps,
    // MenuList
    MenuListProps,
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

        return (
          <div>
            <Input
              label={label}
              dense={dense}
              {...InputProps}
              {...restInputProps}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              autoFocus={autoFocus}
              ref={ref as React.Ref<HTMLInputElement>}
            />
            {!readOnly && (keepPopperMounted || isOpen) && (
              <Popper {...PopperProps} open={isOpen} anchorEl={anchorEl.current}>
                <Paper bordered shadow="doubleLine" {...PaperProps}>
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
                  </MenuList>
                </Paper>
              </Popper>
            )}
          </div>
        );
      }}
    </Downshift>
  );
}
