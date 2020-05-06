/**
 * @jest-environment jsdom
 */

import { useDebouncedState } from '../src/useDebouncedState';

// t
import { renderHook, act } from '@testing-library/react-hooks';

it('should set state after debounced time', async () => {
  const delay = 1;
  const initialState = {};
  const { result, waitForNextUpdate } = renderHook(() => useDebouncedState(delay, initialState));

  const nextState = {};
  act(() => {
    result.current[1](nextState);
  });

  expect(result.current[0]).toBe(initialState);

  await waitForNextUpdate();

  expect(result.current[0]).toBe(nextState);
});

it('should not set state when unmounted', (done) => {
  // eslint-disable-next-line no-console
  console.error = jest.fn();

  const delay = 1;
  const { result, unmount } = renderHook(() => useDebouncedState(delay));

  act(() => {
    result.current[1]({});
  });

  unmount();

  setTimeout(() => {
    // eslint-disable-next-line no-console
    expect(console.error).not.toBeCalled();
    done();
  }, delay);
});
