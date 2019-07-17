/**
 *
 * FormMaskedField/textMask
 *
 */

import {
  createTextMaskInputElement as textMaskCreateTextMaskInputElement,
  conformToMask as textMaskConformToMask,
} from 'text-mask-core';

export const CARET_TRAP = '[]';

export type Mask = ((value: string) => (string | RegExp)[]) | (string | RegExp)[];

export interface CreateTextMaskInputProps {
  inputElement: HTMLInputElement;
  mask: Mask;
  guide?: boolean;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  showMask?: boolean;
}

export function createTextMaskInput(props: CreateTextMaskInputProps) {
  return textMaskCreateTextMaskInputElement(props);
}

export interface ConformToMaskProps {
  guide?: boolean;
  previousConformedValue?: string;
  placeholderChar?: string;
}

export function conformToMask(maskOrFunc: Mask, value: string, props?: ConformToMaskProps): string {
  return textMaskConformToMask(value, maskOrFunc, props).conformedValue;
}

export function unmask(maskOrFunc: Mask, value: string, decimalSymbol?: string): string {
  const mask = (typeof maskOrFunc === 'function' ? maskOrFunc(value) : maskOrFunc).filter(
    (part) => part !== CARET_TRAP,
  );

  let unmaskedValue = '';
  let char, part;
  for (let i = 0; i < value.length; i++) {
    char = value[i];
    part = mask[i];
    if (part instanceof RegExp) {
      const matched = char.match(part);
      if (matched) {
        unmaskedValue = unmaskedValue + matched[0];
      }
    } else if (decimalSymbol && part === decimalSymbol) {
      unmaskedValue = unmaskedValue + '.';
    }
  }

  return unmaskedValue;
}
