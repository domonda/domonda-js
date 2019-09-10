/**
 * @jest-environment jsdom
 */

import { usePlumb } from '../src/usePlumb';
import { deepEqual } from 'fast-equals';

// t
import { renderHook, act } from '@testing-library/react-hooks';

interface State {
  document: {
    id: string;
  };
}

const initialState: State = {
  document: {
    id: 'test',
  },
};

describe('Creation', () => {
  it('should create the plumb', () => {
    const { result } = renderHook(() => usePlumb(initialState, undefined));

    expect(result.current.state).toBe(initialState);
  });
});

describe('Updating', () => {
  it('should not change plumb when props havent changed', () => {
    const { result, rerender } = renderHook((props) => usePlumb(initialState, undefined, props), {
      initialProps: {},
    });

    const plumb = result.current;

    act(() => {
      rerender({});
    });

    expect(plumb).toBe(result.current);
  });

  it('should dispose previous plumb when props change', () => {
    const { result, rerender } = renderHook((props) => usePlumb(initialState, undefined, props), {
      initialProps: {
        skipInitialTransform: true,
      },
    });

    const prevPlumb = result.current;

    act(() => {
      rerender({
        skipInitialTransform: false,
      });
    });

    expect(prevPlumb.disposed).toBeTruthy();
    expect(result.current.disposed).toBeFalsy();
  });

  it('should next updated state instead of re-creating the plumb', () => {
    const { result, rerender } = renderHook(({ state, tag }) => usePlumb(state, tag), {
      initialProps: { state: initialState, tag: undefined as (string | undefined) },
    });

    const spy = jest.fn();
    result.current.subscribe(spy);

    const nextState: State = { document: { id: 'test-2' } };
    act(() => {
      rerender({ state: nextState, tag: 'tag' });
    });

    expect(result.current.disposed).toBeFalsy();
    expect(result.current.state).toBe(nextState);
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe(nextState);
    expect(spy.mock.calls[0][1]).toBe('tag');
  });

  it('should use `stateIsEqual` as nexting filter for seemingly updated state', () => {
    const { result, rerender } = renderHook(
      ({ state, stateIsEqual }) => usePlumb(state, undefined, { stateIsEqual }),
      {
        initialProps: { state: initialState, stateIsEqual: deepEqual },
      },
    );

    const spy = jest.fn();
    result.current.subscribe(spy);

    const nextState: State = { document: { id: 'test' } };
    act(() => {
      rerender({ state: nextState, stateIsEqual: deepEqual });
    });

    expect(result.current.state).toBe(initialState);
    expect(spy).not.toBeCalled();
  });
});

describe('Cleanup', () => {
  it('should dispose of plumb on unmount', () => {
    const { result, unmount } = renderHook(() => usePlumb(initialState, undefined));
    const plumb = result.current;

    act(() => {
      unmount();
    });

    expect(plumb.disposed).toBeTruthy();
  });
});
