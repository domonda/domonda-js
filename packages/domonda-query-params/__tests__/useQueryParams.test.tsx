/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createMemoryHistory } from 'history';
import { QueryModel, stringify } from '../src/queryParams';
import { useQueryParams } from '../src/useQueryParams';
import { QueryParamsProvider } from '../src/QueryParamsContext';

// t
import { renderHook, act } from '@testing-library/react-hooks';
import { render as renderTree, act as actTree } from '@testing-library/react';

it('should update the state and the url through the setter', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: '',
    },
  };

  const { result } = renderHook(() => useQueryParams(model), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });

  const state = { str: 'test' };

  act(() => {
    result.current[1](state);
  });

  expect(result.current[0]).toEqual(state);
  expect(history.location.search).toBe(stringify(state, { prependQuestionMark: true }));
});

it('should pass the current params to the updater, update the state and the url', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: '',
    },
  };

  const { result } = renderHook(() => useQueryParams(model), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });

  const state = { str: 'test' };

  act(() => {
    result.current[1]((currState) => {
      expect(currState).toEqual({ str: '' });
      return state;
    });
  });

  expect(result.current[0]).toEqual(state);
  expect(history.location.search).toBe(stringify(state, { prependQuestionMark: true }));
});

it('should not allow mutations on resulting parameters', () => {
  const history = createMemoryHistory();

  interface State {
    arr: string[] | undefined;
  }

  const model: QueryModel<State> = {
    arr: {
      type: 'array',
      defaultValue: undefined,
    },
  };

  const state: State = {
    arr: ['one'],
  };

  const useMutatingQueryParams = (): [State, (nextParams: State) => void] => {
    const [params, setParams] = useQueryParams(model);
    try {
      if (params.arr) params.arr[0] = 'two';
    } catch (err) {
      // because of strict mode
      expect(err).toBeInstanceOf(TypeError);
    }
    return [params, setParams];
  };

  const { result } = renderHook(() => useMutatingQueryParams(), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });

  act(() => {
    result.current[1](state);
  });

  expect(result.current[0]).toEqual(state);
  expect(history.location.search).toBe(stringify(state, { prependQuestionMark: true }));
});

it('should update the state on history location change', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: '',
    },
  };

  const { result } = renderHook(() => useQueryParams(model), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });

  const nextState = { str: 'test' };
  act(() => {
    history.push({ search: stringify(nextState) });
  });

  expect(result.current[0]).toEqual(nextState);
});

it('should pass the recent state in the updater when history location changes', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: '',
    },
  };

  const { result } = renderHook(() => useQueryParams(model), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });

  // take updater reference because `result` changes on acts
  const updater = result.current[1];

  const nextState = { str: 'test' };
  act(() => {
    history.push({ search: stringify(nextState) });
  });

  expect(result.current[0]).toEqual(nextState);
  updater((currState) => {
    expect(currState).toEqual(nextState);
    return currState;
  });
});

it('should return new params when model changes', () => {
  const history = createMemoryHistory();

  const { result, rerender } = renderHook(
    (model: QueryModel<any>) => useQueryParams(model, { disableReplace: true }),
    {
      initialProps: {
        str: {
          type: 'string',
          defaultValue: 'default',
        },
      },
      wrapper: ({ children }) => (
        <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
      ),
    },
  );

  expect(result.current[0]).toEqual({ str: 'default' });

  act(() => {
    rerender({
      str: {
        type: 'string',
        defaultValue: 'otherdefault',
      },
      num: {
        type: 'number',
        defaultValue: 7,
      },
    });
  });

  expect(result.current[0]).toEqual({ str: 'otherdefault', num: 7 });
});

it('should retain params reference when model does not change', () => {
  const history = createMemoryHistory();

  const { result, rerender } = renderHook(
    (model: QueryModel<any>) => useQueryParams(model, { disableReplace: true }),
    {
      initialProps: {
        str: {
          type: 'string',
          defaultValue: 'default',
        },
      },
      wrapper: ({ children }) => (
        <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
      ),
    },
  );

  const initialParams = result.current[0];
  expect(initialParams).toEqual({ str: 'default' });

  act(() => {
    rerender({
      str: {
        type: 'string',
        defaultValue: 'default',
      },
    });
  });

  expect(result.current[0]).toBe(initialParams);
});

it('should not rerender when location is not on pathname', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
    },
  };

  const spy = jest.fn();
  function Tester() {
    useQueryParams(model, { onPathname: '/only-here' });
    spy();
    return null;
  }

  renderTree(
    <QueryParamsProvider history={history}>
      <Tester />
    </QueryParamsProvider>,
  );

  actTree(() => {
    history.push('/not-here');
  });

  actTree(() => {
    history.push('/not-here-either');
  });

  actTree(() => {
    history.push('/nor-here');
  });

  actTree(() => {
    history.push('/only-here');
  });

  actTree(() => {
    history.push({
      pathname: '/only-here',
      search: stringify({ str: 'not-default' }),
    });
  });

  expect(spy).toBeCalledTimes(2); // initial render and changed params
});

it('should update params only on pathname', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
    },
  };

  const { result } = renderHook(() => useQueryParams(model, { onPathname: '/documents' }), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });

  const initialParams = result.current[0];
  expect(initialParams).toEqual({ str: 'default' });

  act(() => {
    history.push({
      pathname: '/invoices',
      search: stringify({ str: 'ignore' }),
    });
  });

  expect(result.current[0]).toBe(initialParams);

  act(() => {
    history.push({
      pathname: '/documents',
      search: stringify({ str: 'consider' }),
    });
  });

  expect(result.current[0]).toEqual({ str: 'consider' });
});

it("should retain same result reference when params haven't changed", () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
    },
  };

  const { result } = renderHook(() => useQueryParams(model, { disableReplace: true }), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });

  const initialParams = result.current[0];
  expect(initialParams).toEqual({ str: 'default' });

  act(() => {
    history.push({ search: stringify({ str: 'default' }) });
  });

  expect(result.current[0]).toBe(initialParams);
});

it('should retain same result reference returning to the locked pathname with same params', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
    },
  };

  const { result } = renderHook(() => useQueryParams(model, { onPathname: '/documents' }), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });

  const initialParams = result.current[0];
  expect(initialParams).toEqual({ str: 'default' });

  act(() => {
    history.push('/documents');
  });

  expect(result.current[0]).toBe(initialParams);
});

it('should return selected param', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string; num: number }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
    },
    num: {
      type: 'number',
      defaultValue: 1,
    },
  };

  const { result } = renderHook(() => useQueryParams(model, { selector: ({ str }) => str }), {
    wrapper: ({ children }) => (
      <QueryParamsProvider history={history}>{children}</QueryParamsProvider>
    ),
  });
  expect(result.current[0]).toBe('default');

  act(() => {
    history.push({
      search: stringify({ str: 'not-default' }),
    });
  });
  expect(result.current[0]).toBe('not-default');

  act(() => {
    result.current[1]((params) => ({ ...params, str: 'certainly-not-default' }));
  });
  expect(result.current[0]).toBe('certainly-not-default');
  expect(history.location.search).toBe(
    stringify({ str: 'certainly-not-default', num: 1 }, { prependQuestionMark: true }),
  );
});

it('should not rerender when selected param does not change', () => {
  const history = createMemoryHistory();

  const model: QueryModel<{ str: string; num: number }> = {
    str: {
      type: 'string',
      defaultValue: 'default',
    },
    num: {
      type: 'number',
      defaultValue: 1,
    },
  };

  const spy = jest.fn();
  const selector = ({ str }: { str: string }) => str;
  function Tester() {
    useQueryParams(model, { selector });
    spy();
    return null;
  }

  renderTree(
    <QueryParamsProvider history={history}>
      <Tester />
    </QueryParamsProvider>,
  );

  actTree(() => {
    history.push('/not-here');
  });

  actTree(() => {
    history.push('/not-here-either');
  });

  actTree(() => {
    history.push('/nor-here');
  });

  actTree(() => {
    history.push('/only-here');
  });

  actTree(() => {
    history.push({
      pathname: '/only-here',
      search: stringify({ num: 2 }),
    });
  });

  actTree(() => {
    history.push({
      pathname: '/only-here',
      search: stringify({ str: 'not-default' }),
    });
  });

  expect(spy).toBeCalledTimes(2); // initial render and matched pathname
});
