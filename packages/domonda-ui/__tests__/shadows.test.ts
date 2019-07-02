import { createShadow } from '../src/styles/shadows';

test('createShadow creates a string', () => {
  const shadow = createShadow(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
  expect(typeof shadow).toBe('string');
});

test('createShadow creates box-shadow', () => {
  const shadow = createShadow(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
  expect(shadow).toBe(
    '1px 1px 1px 1px rgba(0,0,0,0.15),1px 1px 1px 1px rgba(0,0,0,0.1),1px 1px 1px 1px rgba(0,0,0,0.05)',
  );
});
