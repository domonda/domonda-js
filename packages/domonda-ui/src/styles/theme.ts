import { ThemeProvider as JSSThemeProvider, withTheme as jssWithTheme } from 'react-jss';
import deepmerge from 'deepmerge';
import { createSpacing, Spacing } from './spacing';
import { defaultShadows, Shadows } from './shadows';
import { defaultShape, Shape } from './shape';
import { createPalette, Palette } from './palette';
import { defaultTypography, Typography } from './typography';
import { defaultTransition, Transition } from './transition';

export interface Theme {
  palette: Palette;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  shape: Shape;
  transition: Transition;
}

export const defaultTheme: Theme = {
  spacing: createSpacing(12),
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
  typography: defaultTypography,
  shadows: defaultShadows,
  shape: defaultShape,
  transition: defaultTransition,
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
