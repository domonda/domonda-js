/**
 *
 * storybook config
 *
 */

import React, { StrictMode } from 'react';
import { configure, addDecorator } from '@storybook/react';

import { Small } from '../src/Typography';
import { Button } from '../src/Button';

// theme
import { ThemeProvider, createTheme } from '../src/styles/theme';
import { themeRef } from './theme.treat';
import { TreatProvider } from 'react-treat';
import '../src/styles/baseline.treat';

const req = require.context('../__stories__', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator((story) => (
  <StrictMode>
    <ThemeProvider theme={createTheme()}>
      <TreatProvider theme={themeRef}>
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
            <Small>
              Design by:&nbsp;
              <Button
                size="inherit"
                variant="link"
                component={({ children, ...rest }) => (
                  <a {...rest} href="http://saismo.at/" target="_blank">
                    {children}
                  </a>
                )}
              >
                saismo
              </Button>
            </Small>
          </div>
        </div>
      </TreatProvider>
    </ThemeProvider>
  </StrictMode>
));

configure(loadStories, module);
