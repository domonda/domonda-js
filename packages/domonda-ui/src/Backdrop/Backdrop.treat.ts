import { styleMap } from '../styles/treat';

export const styles = styleMap(() => ({
  root: {
    position: 'fixed',
    zIndex: -1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Disable scroll capabilities.
    touchAction: 'none',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
  },
  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent',
  },
}));
