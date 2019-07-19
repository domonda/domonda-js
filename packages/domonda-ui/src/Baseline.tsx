/**
 *
 * Baseline
 *
 */

import * as React from 'react';
import { withStyles, WithStyles, createStyles } from './styles';

const styles = createStyles(({ typography, palette }) => ({
  '@global': {
    '*, *::before, *::after': {
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: 'border-box',
    },
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    'strong, b': {
      fontWeight: typography.weights.bold,
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      position: 'relative',
      backgroundColor: palette.background,
      color: palette.textPrimary,
      ...typography.body,
    },
  },
}));

const Baseline: React.FC<WithStyles<typeof styles>> = () => <React.Fragment />;

const StyledBaseline = withStyles(styles)(Baseline);
export { StyledBaseline as Baseline };
