import React from 'react';
import { install, createTheme, ThemeProvider } from '../src/styles';
import { Baseline } from '../src/Baseline';
import { configure, addDecorator } from '@storybook/react';

const req = require.context('../stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

install();
const theme = createTheme();

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <Baseline />
    <div style={{ padding: 25 }}>{story()}</div>
  </ThemeProvider>
));

configure(loadStories, module);
