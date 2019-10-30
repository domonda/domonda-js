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

export const DEFAULT_SPACING_BASE = 4;

export const defaultTheme: Theme = {
  spacing: createSpacing({
    none: 0,
    tiny: DEFAULT_SPACING_BASE, // 4
    small: DEFAULT_SPACING_BASE * 3, // 12
    medium: DEFAULT_SPACING_BASE * 6, // 24
    large: DEFAULT_SPACING_BASE * 9, // 36
  }),
  palette: createPalette({
    default: '#3f3f3f',
    primary: '#f44336',
    secondary: '#607d8b',
    textPrimary: '#000000',
    textSecondary: '#a7a7a7',
    textLight: '#ffffff',
    success: '#02bb44',
    error: '#cc0000',
    warning: '#fda50d',
    border: '#d8d8d8',
    background: '#f3f4f8',
    surface: '#ffffff',
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
    line: '0 1px 1px rgba(1, 38, 56, 0.1)',
    doubleLine: '0 2px 2px rgba(1, 38, 56, 0.1)',
    small: '0 10px 15px rgba(0, 0, 0, 0.05)',
    large:
      '0 25px 50px rgba(0, 0, 50, 0.1), 0 8px 20px rgba(0, 0, 50, 0.15), 0 5px 7px rgba(0, 0, 0, 0.05)',
  }),
  shape: createShape({
    borderRadius: {
      small: '2px',
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
