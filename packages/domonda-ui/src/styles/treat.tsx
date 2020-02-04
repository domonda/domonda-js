/**
 *
 * treat
 *
 */

import React, { createContext, useContext } from 'react';
import { TreatProvider } from 'react-treat';
import { createTheme, Theme as ThisTheme } from './theme';

export * from 'treat';
export { useClassName, useStyles } from 'react-treat';

declare module 'treat/theme' {
  export interface Theme extends ThisTheme {}
}

const ThemeContext = createContext<ThisTheme>(createTheme());

export const ThemeProvider: React.FC<{ themeRef: string; theme: ThisTheme }> = (props) => {
  const { children, themeRef, theme } = props;
  return (
    <ThemeContext.Provider value={theme}>
      <TreatProvider theme={themeRef}>{children}</TreatProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
