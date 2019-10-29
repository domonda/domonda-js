import { createSpacing } from '../src/styles/spacing';

const spaces = {
  none: 0,
  tiny: 1,
  small: 2,
  default: 3,
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

  expect(spacing('large', 'default')).toBe(spaces.large + 'px ' + spaces.default + 'px');
  expect(spacing('default', 'default', 'none')).toBe(
    spaces.default + 'px ' + spaces.default + 'px ' + spaces.none + 'px',
  );
  expect(spacing('tiny', 'small', 'default', 'large')).toBe(
    spaces.tiny + 'px ' + spaces.small + 'px ' + spaces.default + 'px ' + spaces.large + 'px',
  );
});
