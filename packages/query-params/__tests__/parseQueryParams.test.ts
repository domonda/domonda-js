import { QueryModel, parseQueryParams, defaultQueryParams, stringify } from '../src/queryParams';

it('should parse strings', () => {
  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: '',
    },
  };

  const values = parseQueryParams('?str=test', model);

  expect(values).toEqual({ str: 'test' });
});

it('should parse strings with plain numbers', () => {
  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: '',
    },
  };

  const values = parseQueryParams('?str=123', model);

  expect(values).toEqual({ str: '123' });
});

it('should parse strings with plain numbers beginning with zero', () => {
  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: '',
    },
  };

  const values = parseQueryParams('?str=0123', model);

  expect(values).toEqual({ str: '0123' });
});

it('should parse numbers', () => {
  const model: QueryModel<{ num: number }> = {
    num: {
      type: 'number',
      defaultValue: -1,
    },
  };

  const values = parseQueryParams('?num=1', model);

  expect(values).toEqual({ num: 1 });
});

it('should parse booleans', () => {
  const model: QueryModel<{ flag: boolean }> = {
    flag: {
      type: 'boolean',
      defaultValue: true,
    },
  };

  const values = parseQueryParams('?flag=false', model);

  expect(values).toEqual({ flag: false });
});

it('should parse strings with booleans', () => {
  const model: QueryModel<{ tr: string; fl: string }> = {
    tr: {
      type: 'string',
      defaultValue: '',
    },
    fl: {
      type: 'string',
      defaultValue: '',
    },
  };

  const values = parseQueryParams('?tr=true&fl=false', model);

  expect(values).toEqual({ tr: 'true', fl: 'false' });
});

it('should parse dates', () => {
  const model: QueryModel<{ date: Date }> = {
    date: {
      type: 'date',
      defaultValue: new Date(),
    },
  };

  const values = parseQueryParams('?date=2008-01-02T02:03:04.005Z', model);

  expect(values).toEqual({ date: new Date('2008-01-02') });
});

it('should handle empty dates', () => {
  const model: QueryModel<{ date: Date | null }> = {
    date: {
      type: 'date',
      defaultValue: null,
    },
  };

  const values = parseQueryParams('?', model);

  expect(values).toEqual({ date: null });
});

it('should handle invalid dates', () => {
  const model: QueryModel<{ date: Date | null }> = {
    date: {
      type: 'date',
      defaultValue: null,
    },
  };

  const values = parseQueryParams('?date=notadate', model);

  expect(values).toEqual({ date: null });
});

it('should parse an array of strings', () => {
  const model: QueryModel<{ strs: string[] }> = {
    strs: {
      type: 'array',
      defaultValue: [''],
    },
  };

  const values = parseQueryParams('?strs[]=test', model);

  expect(values).toEqual({ strs: ['test'] });
});

it('should parse an array of string numbers which begin with zero', () => {
  const model: QueryModel<{ strs: string[] }> = {
    strs: {
      type: 'array',
      defaultValue: [''],
    },
  };

  const values = parseQueryParams('?strs[]=0123', model);

  expect(values).toEqual({ strs: ['0123'] });
});

it('should parse an array of numbers', () => {
  const model: QueryModel<{ nums: number[] }> = {
    nums: {
      type: 'array',
      defaultValue: [-1],
    },
  };

  const values = parseQueryParams('?nums[]=1', model);

  expect(values).toEqual({ nums: [1] });
});

it('should parse an empty array', () => {
  const model: QueryModel<{ emptarr: number[] }> = {
    emptarr: {
      type: 'array',
      defaultValue: [-1],
    },
  };

  const values = parseQueryParams('?emptarr[]', model);

  expect(values).toEqual({ emptarr: [] });
});

it('should use default value when undefined', () => {
  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
    },
  };

  const values = parseQueryParams('?num=1', model);

  expect(values).toEqual({ str: 'default' });
});

it('should use default value when invalid', () => {
  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
      validate: (value) => value === 'valid',
    },
  };

  const values = parseQueryParams('?str=invalid', model);

  expect(values).toEqual({ str: 'default' });
});

it('should not validate empty values', () => {
  const validate = jest.fn();
  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
      validate,
    },
  };

  parseQueryParams('?other=value', model);

  expect(validate).not.toBeCalled();
});

it('should parse the complete model', () => {
  const model: QueryModel<{
    str: string;
    num: number;
    strs: string[];
    nums: number[];
    enum: string;
  }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
    },
    num: {
      type: 'number',
      defaultValue: -1,
    },
    strs: {
      type: 'array',
      defaultValue: [''],
    },
    nums: {
      type: 'array',
      defaultValue: [-1],
      validate: (nums) => {
        return nums.every((num) => typeof num === 'number');
      },
    },
    enum: {
      type: 'string',
      defaultValue: 'default',
      validate: (value) => value === 'VALID_ENUM',
    },
  };

  const values = parseQueryParams(
    '?str=Some%20test%20sentence&num=099&strs[]=first&strs[]=second&nums[]=notnums&enum=VALID_ENUM',
    model,
  );

  expect(values).toEqual({
    str: 'Some test sentence',
    num: 99,
    strs: ['first', 'second'],
    nums: [-1],
    enum: 'VALID_ENUM',
  });
});

it('should not allow mutations on resulting parameters', () => {
  interface State {
    str: string;
    num: number;
    arr: string[];
  }

  const model: QueryModel<State> = {
    str: {
      type: 'string',
      defaultValue: '',
    },
    num: {
      type: 'number',
      defaultValue: 0,
    },
    arr: {
      type: 'array',
      defaultValue: [''],
    },
  };

  const state: State = {
    str: 'one',
    num: 1,
    arr: ['one'],
  };

  const values = parseQueryParams(stringify(state, { prependQuestionMark: true }), model);

  try {
    values.str = 'two';
  } catch (err) {
    // because of strict mode
    expect(err).toBeInstanceOf(TypeError);
  }

  try {
    values.num = 2;
  } catch (err) {
    // because of strict mode
    expect(err).toBeInstanceOf(TypeError);
  }

  try {
    values.arr[0] = 'two';
  } catch (err) {
    // because of strict mode
    expect(err).toBeInstanceOf(TypeError);
  }

  expect(values).toEqual(state);
});

describe('defaultQueryParams', () => {
  it('should return default params given a model', () => {
    const model: QueryModel<unknown> = {
      str: {
        type: 'string',
        defaultValue: 'default',
      },
      num: {
        type: 'number',
        defaultValue: -1,
      },
      strs: {
        type: 'array',
        defaultValue: [''],
      },
      nums: {
        type: 'array',
        defaultValue: [-1],
      },
    };

    const defaultParams = defaultQueryParams(model);

    expect(defaultParams).toEqual({
      str: 'default',
      num: -1,
      strs: [''],
      nums: [-1],
    });
  });
});
