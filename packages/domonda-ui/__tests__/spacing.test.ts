import { createSpacing } from '../src/styles/spacing';

it('createSpacing creates spacing function', () => {
  const spacing = createSpacing(8);
  expect(typeof spacing).toBe('function');
});

it('spacing returns multiple of a given factor', () => {
  const spacing = createSpacing(21);
  expect(spacing(2)).toBe('42px');
});

it('spacing returns multiple factors in px', () => {
  const spacing = createSpacing(1);
  expect(spacing(1, 2, 3, 4)).toBe('1px 2px 3px 4px');
});

it('spacing returns default spacing with no argument', () => {
  const spacing = createSpacing(8);
  expect(spacing()).toBe('8px');
});
