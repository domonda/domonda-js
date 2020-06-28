/**
 *
 * palette
 *
 */

import { getContrastRatio, fade, lighten, darken } from './colorManipulator';

// base (definable) colors
export type BaseColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'background'
  | 'foreground'
  | 'surface'
  | 'focus'
  | 'gray08'
  | 'gray18'
  | 'gray30'
  | 'gray40'
  | 'gray80'
  | 'gray100';
export type BaseColors = { [baseColor in BaseColor]: string };

// base colors with derived colors
export type Color =
  | BaseColor
  | 'disabled'
  | 'border'
  | 'link' // accent
  | 'text'
  | 'lightText';
export type Colors = { [color in Color]: string };
export const COLORS: Color[] = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'danger',
  'background',
  'foreground',
  'surface',
  'focus',
  'gray08',
  'gray18',
  'gray30',
  'gray40',
  'gray80',
  'gray100',
  'disabled',
  'border',
  'link',
  'text',
  'lightText',
];

// color variants
export type ColorVariant = 'lightest' | 'light' | 'dark';
export type ColorVariants = { [variant in ColorVariant]: (color: Color) => string };
export const COLOR_VARIANTS: ColorVariant[] = ['lightest', 'light', 'dark'];

// palette
export type Palette = Colors &
  ColorVariants & {
    fade: (color: Color, amount: number) => string;
    lighten: (color: Color, amount: number) => string;
    darken: (color: Color, amount: number) => string;
    getContrastText: (background: string) => string;
  };

export function createPalette(baseColors: BaseColors): Palette {
  const getContrastText = (background: string) => {
    const contrastThreshold = 7;
    return getContrastRatio(background, baseColors.foreground) <= contrastThreshold
      ? baseColors.gray08
      : baseColors.gray80;
  };

  const colors: Colors = {
    ...baseColors,
    disabled: darken(baseColors.background, 0.1),
    border: darken(baseColors.background, 0.3),
    link: baseColors.accent,
    text: getContrastText(baseColors.background),
    lightText: lighten(getContrastText(baseColors.background), 0.3),
  };

  return {
    ...colors,
    lightest: (color) => lighten(colors[color], 0.85),
    light: (color) => lighten(colors[color], 0.5),
    dark: (color) => darken(colors[color], 0.2),
    lighten: (color, value) => lighten(colors[color], value),
    darken: (color, value) => darken(colors[color], value),
    fade: (color, value) => fade(colors[color], value),
    getContrastText,
  };
}
