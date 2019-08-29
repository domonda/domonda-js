/**
 * @jest-environment jsdom
 */

import { createPlumb } from '@domonda/plumb';
import { useMappedPlumb } from '../src/hooks/plumb';

// t
import { renderHook, act } from '@testing-library/react-hooks';

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
    act(() => {
      nextValues.forEach((value) => plumb.next(value, undefined));
    });

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
