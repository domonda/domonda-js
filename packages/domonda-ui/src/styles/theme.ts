import {
  ThemeProvider as JSSThemeProvider,
  withTheme as jssWithTheme,
  useTheme as jssUseTheme,
} from 'react-jss';
import deepmerge from 'deepmerge';
import { createSpacing, Spacing } from './spacing';
import { createShadows, Shadows } from './shadows';
import { createShape, Shape } from './shape';
import { createPalette, Palette } from './palette';
import { SYSTEM_FONT, createTypography, Typography } from './typography';
import { defaultTransition, Transition } from './transition';
import { ZIndex, defaultZIndex } from './zIndex';

export interface Theme {
  palette: Palette;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  shape: Shape;
  transition: Transition;
  zIndex: ZIndex;
}

export const DEFAULT_SPACING_BASE = 8;

export const defaultTheme: Theme = {
  spacing: createSpacing({
    none: 0,
    tiny: DEFAULT_SPACING_BASE, // 8
    small: DEFAULT_SPACING_BASE * 2, // 16
    medium: DEFAULT_SPACING_BASE * 3, // 24
    large: DEFAULT_SPACING_BASE * 5, // 40
  }),
  palette: createPalette({
    primary: '#F44336', // domonda red
    secondary: '#607D8B', // domonda blue-gray
    accent: '#183C63',
    white: '#FFFFFF',
    gray04: '#F5F6F7',
    gray08: '#E8EBED',
    gray18: '#D3D9DB',
    gray30: '#B0BABF',
    gray40: '#93A5AE',
    gray60: '#5A6B73',
    gray80: '#21353E',
    gray100: '#012638',
    success: '#44A00C',
    warning: '#DF7818',
    danger: '#FF0000',
  }),
  typography: createTypography({
    fonts: {
      header: SYSTEM_FONT,
      body: SYSTEM_FONT,
    },
    weights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
    },
    sizes: {
      tiny: 12,
      small: 14,
      medium: 16,
      large: 20, // or 18 because of increments by `2`?
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

export const createTheme = (options: Partial<Theme> = defaultTheme) =>
  deepmerge(defaultTheme, options);

export interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: React.ComponentType<ThemeProviderProps> = JSSThemeProvider as any;

export interface WithTheme {
  theme: Theme;
}

export function withTheme<P extends WithTheme>(
  Component: React.ComponentType<P>,
): React.ComponentType<P & { theme?: Theme }> {
  return jssWithTheme<P, React.ComponentType<P>, P & { theme?: Theme }>(Component);
}

export function useTheme(): Theme {
  return jssUseTheme() as Theme;
}
