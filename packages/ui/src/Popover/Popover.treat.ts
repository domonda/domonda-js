import { style } from 'treat';

export const paper = style(() => ({
  position: 'absolute',
  overflowX: 'hidden',
  overflowY: 'auto',
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: 'calc(100% - 32px)',
  maxHeight: 'calc(100% - 32px)',
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
}));
