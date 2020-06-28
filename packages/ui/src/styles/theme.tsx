/**
 *
 * theme
 *
 */

import React, { createContext, useContext } from 'react';
import deepmerge from 'deepmerge';
import { Sizing, createSizing, Sizes } from './sizes';
import { createShadows, Shadows } from './shadows';
import { createShape, Shape } from './shape';
import { createPalette, Palette } from './palette';
import { SYSTEM_FONT, createTypography, Typography } from './typography';
import { defaultTransition, Transition } from './transition';
import { ZIndex, defaultZIndex } from './zIndex';

export interface Theme {
  sizing: Sizing;
  palette: Palette;
  typography: Typography;
  shadows: Shadows;
  shape: Shape;
  transition: Transition;
  zIndex: ZIndex;
}

const DEFAULT_SIZES: Sizes = {
  none: '0',
  tiny: '0.25rem', // 4
  small: '0.5rem', // 8
  regular: '1rem', // 16
  large: '2rem', // 32
};

export const defaultTheme: Theme = {
  sizing: createSizing(DEFAULT_SIZES),
  palette: createPalette({
    primary: '#F44336', // domonda red
    secondary: '#607D8B', // domonda blue-gray
    accent: '#183C63',
    success: '#44A00C',
    warning: '#DF7818',
    danger: '#FF0000',
    background: '#F5F6F7',
    foreground: '#21353E',
    surface: '#FFFFFF',
    focus: '#005fCC',
    gray08: '#E8EBED',
    gray18: '#D3D9DB',
    gray30: '#B0BABF',
    gray40: '#93A5AE',
    gray80: '#21353E',
    gray100: '#012638',
  }),
  typography: createTypography(DEFAULT_SIZES)({
    fonts: {
      header: SYSTEM_FONT,
      body: SYSTEM_FONT,
    },
    weights: {
      regular: 400,
      medium: 600,
      bold: 800,
    },
  }),
  shadows: createShadows({
    line: '0 1px 1px rgba(1, 38, 56, 0.2)',
    doubleLine: '0 2px 2px rgba(1, 38, 56, 0.2)',
    small: '0 10px 15px rgba(0, 0, 0, 0.05)',
    large:
      '0 25px 50px rgba(0, 0, 50, 0.1), 0 8px 20px rgba(0, 0, 50, 0.15), 0 5px 7px rgba(0, 0, 0, 0.05)',
  }),
  shape: createShape({
    borderRadius: {
      tiny: '2px',
      small: '4px',
      pill: '50vh', // applying a very large border radius create the capsule/pill effect
    },
  }),
  transition: defaultTransition,
  zIndex: defaultZIndex,
};

export const createTheme = (
  theme: Partial<{
    sizing: Partial<Sizing>;
    palette: Partial<Palette>;
    typography: Typography;
    shadows: Partial<Shadows>;
    shape: Partial<Shape>;
    transition: Partial<Transition>;
    zIndex: Partial<ZIndex>;
  }> = defaultTheme,
) => deepmerge(defaultTheme, theme) as Theme;

const ThemeContext = createContext<Theme>(createTheme());

/** ThemeProvider provides the itself and the treat context. */
export const ThemeProvider: React.FC<{ theme: Theme }> = (props) => {
  const { children, theme } = props;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  return useContext(ThemeContext);
}
