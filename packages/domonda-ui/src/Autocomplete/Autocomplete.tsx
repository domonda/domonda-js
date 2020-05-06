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
          onClick: (event: React.MouseEvent<HTMLInputElement>) => {
            if (InputProps.onClick) {
              InputProps.onClick(event);
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
                color="secondary"
                variant="text"
                size="tiny"
                onClick={() => clearSelection()}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="times"
                  className="svg-inline--fa fa-times fa-w-10"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 80 352 352"
                >
                  <path
                    fill="currentColor"
                    d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
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
