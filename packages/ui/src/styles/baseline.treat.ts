/**
 *
 * baseline
 *
 */

import { globalStyle } from 'treat';

globalStyle('*, *::before, *::after', {
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
});

globalStyle('html', {
  // @ts-expect-error: does indeed exist
  '--webkit-font-smoothing': 'antialiased', // Antialiasing.
  '--moz-osx-font-smoothing': 'grayscale', // Antialiasing.
});

globalStyle('body', {
  margin: 0, // Remove the margin in all browsers.
  position: 'relative',
  backgroundColor: '#F5F6F7',
});
