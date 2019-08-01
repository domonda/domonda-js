/**
 * @jest-environment jsdom
 */

import { createPlumb } from '@domonda/plumb';
import { useMappedPlumb } from '../src/hooks/plumb';

// t
import { renderHook, act } from '@testing-library/react-hooks';

/**
 * Suppress React 16.8 act() warnings globally.
 * The react teams fix won't be out of alpha until 16.9.0.
 * https://github.com/facebook/react/issues/14769#issuecomment-514589856
 */
const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
      consoleError(...args);
    }
  });
});

interface State {
  document: {
    id: string;
  };
}

const initialState: State = {
  document: {
    id: '216d993e',
  },
};

function makePlumb() {
  return createPlumb(initialState);
}

const getDocument = ({ document }: State) => document;

describe('Creation', () => {
  it('should dispatch initial value when supplied', async () => {
    const plumb = makePlumb();

    const { result } = renderHook(() => useMappedPlumb(plumb, getDocument));

    expect(result.current).toBe(getDocument(initialState));
  });
});

describe('Update', () => {
  const nextValues: State[] = [
    {
      document: {
        id: 'a788f2d1',
      },
    },
    {
      document: {
        id: 'd4fb1271',
      },
    },
    {
      document: {
        id: '2d280545',
      },
    },
  ];

  it('should dispatch all nexted values', async () => {
    const plumb = makePlumb();

    const { result, waitForNextUpdate } = renderHook(() => useMappedPlumb(plumb, getDocument));

    // dispatch first
    nextValues.forEach((value) => plumb.next(value));

    // then wait for updates
    nextValues.forEach(async (value) => {
      await waitForNextUpdate();
      expect(result.current).toBe(getDocument(value));
    });
  });
});

describe('Cleanup', () => {
  it('should unsubscribe from the plumb on unmount', () => {
    const plumb = makePlumb();

    const { unmount } = renderHook(() => useMappedPlumb(plumb, getDocument));

    expect(plumb.subscribers.length).toBe(1);

    unmount();

    expect(plumb.subscribers.length).toBe(0);
  });
});
