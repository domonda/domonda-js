import { createSpacing } from '../src/styles/spacing';

const spaces = {
  none: 0,
  tiny: 1,
  small: 2,
  regular: 3,
  large: 4,
};

it('creates spacing function', () => {
  const spacing = createSpacing(spaces);

  expect(spacing).toBeInstanceOf(Function);
});

it('returns the spacing for the passed space as a number', () => {
  const spacing = createSpacing(spaces);

  expect(spacing('small')).toBe(spaces.small);
});

it('returns multiple spacings for given spaces', () => {
  const spacing = createSpacing(spaces);

  expect(spacing('large', 'regular')).toBe(spaces.large + 'px ' + spaces.regular + 'px');
  expect(spacing('regular', 'regular', 'none')).toBe(
    spaces.regular + 'px ' + spaces.regular + 'px ' + spaces.none + 'px',
  );
  expect(spacing('tiny', 'small', 'regular', 'large')).toBe(
    spaces.tiny + 'px ' + spaces.small + 'px ' + spaces.regular + 'px ' + spaces.large + 'px',
  );
});
