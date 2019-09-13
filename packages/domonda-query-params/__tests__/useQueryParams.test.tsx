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
