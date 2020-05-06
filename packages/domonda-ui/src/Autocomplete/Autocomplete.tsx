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
import { Button } from '../Button';
import { Popper, PopperProps } from '../Popper';
import { MenuList, MenuListProps, MenuItem, MenuItemProps } from '../Menu';
import { Paper, PaperProps } from '../Paper';

// decorate
import { useDecorate, Decorate } from './decorate';
import clsx from 'clsx';

const ITEM_SIZE = 36;
const ITEMS_FIT = 8; // how many items should fit the open list

export type AutocompleteGetItemId<T> = (item: T | null) => string;

export type AutocompleteItemToString<T> = (item: T | null) => string;

export interface AutocompleteProps<T>
  extends Omit<DownshiftProps<T>, 'onInputValueChange' | 'getItemId' | 'children'> {
  readonly items: readonly T[];
  classes?: Partial<Decorate['classes']>;
  getItemId?: (item: T | null) => string;
  onInputValueChange?: (value: string | null) => void;
  listWidth?: number;
  listHeight?: number;
  hideClearButton?: boolean;
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
    classes: outerClasses,
    items,
    getItemId = (item: T) => (typeof item === 'string' ? item : JSON.stringify(item)),
    onInputValueChange,
    listWidth,
    listHeight,
    hideClearButton,
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

  const classes = useDecorate({ classes: outerClasses });

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
        clearSelection,
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
          <div className={classes.root}>
            <Input
              ref={ref as React.Ref<HTMLInputElement>}
              label={label}
              placeholder={placeholder}
              dense={dense}
              {...InputProps}
              classes={{
                ...InputProps.classes,
                input: clsx(
                  InputProps.classes?.input,
                  !hideClearButton && classes.inputWithClearButton,
                  !hideClearButton && dense && classes.dense,
                ),
              }}
              {...restInputProps}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              autoFocus={autoFocus}
            />
            {!hideClearButton && (
              <Button
                disabled={!selectedItem}
                className={clsx(
                  classes.clearButton,
                  label && classes.hasLabel,
                  dense && classes.dense,
                )}
                color="danger"
                variant="text"
                size={dense ? 'tiny' : 'small'}
                onClick={() => clearSelection()}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="times"
                  className="svg-inline--fa fa-times fa-w-10"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 80 352 352"
                >
                  <path
                    fill="currentColor"
                    d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
                  ></path>
                </svg>
              </Button>
            )}

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
