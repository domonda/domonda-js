import { fade, getContrastRatio, lighten, darken } from './colorManipulator';

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'textLight'
  | 'success'
  | 'error'
  | 'warning'
  | 'border'
  | 'background'
  | 'surface';
export type Colors = { [color in Color]: string };

export type ColorVariant =
  | 'contrastText'
  | 'lightest'
  | 'lighter'
  | 'light'
  | 'dark'
  | 'darker'
  | 'darkest';
export type ColorVariants = { [variant in ColorVariant]: ((color: Color) => string) };

export type Palette = Colors &
  ColorVariants & {
    fade: (color: Color, value: number) => string;
    getContrastText: (background: string) => string;
  };

export function createPalette(colors: Colors): Palette {
  const getContrastText = (background: string) => {
    const contrastThreshold = 10;
    return getContrastRatio(background, colors.textPrimary) <= contrastThreshold
      ? colors.textLight
      : colors.textPrimary;
  };

  return {
    ...colors,
    fade: (color, value) => fade(colors[color], value),
    getContrastText,
    contrastText: (color) => getContrastText(colors[color]),
    lightest: (color) => lighten(colors[color], 0.9),
    lighter: (color) => lighten(colors[color], 0.7),
    light: (color) => lighten(colors[color], 0.5),
    dark: (color) => darken(colors[color], 0.05),
    darker: (color) => darken(colors[color], 0.12),
    darkest: (color) => darken(colors[color], 0.4),
  };
}
