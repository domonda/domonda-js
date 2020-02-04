/**
 *
 * storybook config
 *
 */

import React, { StrictMode } from 'react';
import { configure, addDecorator } from '@storybook/react';

import { createTheme, ThemeProvider } from '../src/styles';
import { ThemeProvider as TreatThemeProvider } from '../src/styles/treat';
import { Baseline } from '../src/Baseline';
import { Text } from '../src/Text';
import { Button } from '../src/Button';

const req = require.context('../__stories__', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

import { theme } from './theme';
import { themeRef } from './theme.treat';

addDecorator((story) => (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <TreatThemeProvider themeRef={themeRef} theme={theme}>
        <Baseline />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100vh',
            padding: '1em 1em 0 1em',
          }}
        >
          <div style={{ flex: 1 }}>{story()}</div>
          <div style={{ opacity: 0.4, margin: '2em 0 1em 0' }}>
            <Text size="tiny">
              Design by:&nbsp;
              <Button
                size="tiny"
                variant="link"
                component={({ children, ...rest }) => (
                  <a {...rest} href="http://saismo.at/" target="_blank">
                    {children}
                  </a>
                )}
              >
                saismo
              </Button>
            </Text>
          </div>
        </div>
      </TreatThemeProvider>
    </ThemeProvider>
  </StrictMode>
));

configure(loadStories, module);
