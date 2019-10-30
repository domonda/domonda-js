import { createSpacing } from '../src/styles/spacing';

const spaces = {
  none: 0,
  tiny: 1,
  small: 2,
  medium: 3,
  large: 4,
};

it('creates spacing function', () => {
  const spacing = createSpacing(spaces);

  expect(spacing).toBeInstanceOf(Function);
});

it('returns the spacing for the passed space', () => {
  const spacing = createSpacing(spaces);

  expect(spacing('small')).toBe(spaces.small + 'px');
});

it('returns multiple spacings for given spaces', () => {
  const spacing = createSpacing(spaces);

  expect(spacing('large', 'medium')).toBe(spaces.large + 'px ' + spaces.medium + 'px');
  expect(spacing('medium', 'medium', 'none')).toBe(
    spaces.medium + 'px ' + spaces.medium + 'px ' + spaces.none + 'px',
  );
  expect(spacing('tiny', 'small', 'medium', 'large')).toBe(
    spaces.tiny + 'px ' + spaces.small + 'px ' + spaces.medium + 'px ' + spaces.large + 'px',
  );
});
