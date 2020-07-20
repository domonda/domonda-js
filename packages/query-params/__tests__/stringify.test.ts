import { stringify, strictUriEncode } from '../src/queryParams';

it('should prepend question mark', () => {
  const queryString = stringify(
    {
      str: 'test',
    },
    { prependQuestionMark: true },
  );

  expect(queryString).toBe('?str=test');
});

it('should return empty string on empty object', () => {
  let queryString = stringify({}, { prependQuestionMark: true });
  expect(queryString).toBe('');

  queryString = stringify([]);
  expect(queryString).toBe('');
});

it('should persist nulls but omit undefined values', () => {
  const queryString = stringify({
    nl: null,
    undf: undefined,
    str: 'test',
  });

  expect(queryString).toBe('nl&str=test');
});

it('should persist empty arrays', () => {
  const queryString = stringify({
    emptarr: [],
  });

  expect(queryString).toBe('emptarr[]');
});

it('should omit undefined values in arrays', () => {
  const queryString = stringify({
    nullandundef: [null, undefined],
    undef: [undefined],
    undefval: [undefined, 'str'],
    nul: [null],
  });

  expect(queryString).toBe('nul[]&nullandundef[]&undefval[]=str');
});

it('should stringify dates to ISO format', () => {
  const now = new Date();
  const queryString = stringify({
    date: now,
  });

  expect(queryString).toBe(`date=${strictUriEncode(now.toISOString())}`);
});

it('should omit stringifying invalid dates', () => {
  const queryString = stringify({
    date: new Date('notadate'),
  });

  expect(queryString).toBe('');
});
