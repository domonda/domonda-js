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
  | 'white'
  | 'gray04'
  | 'gray08'
  | 'gray18'
  | 'gray30'
  | 'gray40'
  | 'gray60'
  | 'gray80'
  | 'gray100'
  | 'success'
  | 'warning'
  | 'danger';
export type BaseColors = { [baseColor in BaseColor]: string };

// base colors with derived colors

export type Color =
  | BaseColor
  | 'background' // gray04
  | 'disabled' // gray08
  | 'border' // gray18
  | 'link' // accent
  | 'textDark' // gray80
  | 'textLight'; // white
export type Colors = { [color in Color]: string };
export const COLORS: Color[] = [
  'primary',
  'secondary',
  'accent',
  'white',
  'gray04',
  'gray08',
  'gray18',
  'gray30',
  'gray40',
  'gray60',
  'gray80',
  'gray100',
  'success',
  'warning',
  'danger',
  'background',
  'disabled',
  'border',
  'link',
  'textDark',
  'textLight',
];
export const COLOR_PREFIX = 'color-';

// color variants

export type ColorVariant = 'contrastText' | 'lightest' | 'light' | 'dark';
export type ColorVariants = { [variant in ColorVariant]: (color: Color) => string };
export const COLOR_VARIANTS: ColorVariant[] = ['contrastText', 'lightest', 'light', 'dark'];

// palette

export type Palette = Colors &
  ColorVariants & {
    fade: (color: Color, amount: number) => string;
    lighten: (color: Color, amount: number) => string;
    darken: (color: Color, amount: number) => string;
    getContrastText: (background: string) => string;
  };

export function createPalette(baseColors: BaseColors): Palette {
  const colors: Colors = {
    ...baseColors,
    background: baseColors.gray04,
    disabled: baseColors.gray18,
    border: baseColors.gray18,
    link: baseColors.accent,
    textDark: baseColors.gray80,
    textLight: baseColors.white,
  };

  const getContrastText = (background: string) => {
    const contrastThreshold = 7;
    return getContrastRatio(background, colors.textDark) <= contrastThreshold
      ? colors.textLight
      : colors.textDark;
  };

  return {
    ...colors,
    fade: (color, value) => fade(colors[color], value),
    lighten: (color, value) => lighten(colors[color], value),
    darken: (color, value) => darken(colors[color], value),
    getContrastText,
    contrastText: (color) => getContrastText(colors[color]),
    lightest: (color) => lighten(colors[color], 0.85),
    light: (color) => lighten(colors[color], 0.5),
    dark: (color) => darken(colors[color], 0.2),
  };
}
