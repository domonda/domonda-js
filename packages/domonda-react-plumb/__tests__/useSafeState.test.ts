/**
 * @jest-environment jsdom
 */

import { useSafeState } from '../src/useSafeState';

// t
import { renderHook, act } from '@testing-library/react-hooks';

it('should not set state when unmounted', () => {
  console.error = jest.fn();

  const { result, unmount } = renderHook(useSafeState);

  unmount();

  act(() => {
    result.current[1]({});
  });

  expect(console.error).not.toBeCalled();
});
