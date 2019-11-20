import React from 'react';
import { createMemoryHistory } from 'history';
import { QueryModel, stringify } from '../src/queryParams';
import { useQueryParams } from '../src/useQueryParams';
import { QueryParamsProvider } from '../src/QueryParamsContext';

// t
import { renderHook, act } from '@testing-library/react-hooks';

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
    history.push(stringify(nextState, { prependQuestionMark: true }));
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
    history.push(stringify(nextState, { prependQuestionMark: true }));
  });

  expect(result.current[0]).toEqual(nextState);
  updater((currState) => {
    expect(currState).toEqual(nextState);
    return currState;
  });
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
    history.push(`/invoices${stringify({ str: 'ignore' }, { prependQuestionMark: true })}`);
  });

  expect(result.current[0]).toBe(initialParams);

  act(() => {
    history.push(`/documents${stringify({ str: 'consider' }, { prependQuestionMark: true })}`);
  });

  expect(result.current[0]).toEqual({ str: 'consider' });
});

it.only("should retain same result reference when params haven't changed", () => {
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
    history.push(stringify({ str: 'default' }, { prependQuestionMark: true }));
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
