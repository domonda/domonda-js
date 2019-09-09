/**
 * @jest-environment jsdom
 */

import { createPlumb } from '@domonda/plumb';
import { useMappedPlumbState } from '../src/usePlumbState';

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

describe('useMappedPlumbState', () => {
  describe('Creation', () => {
    it('should dispatch initial value when supplied', async () => {
      const plumb = makePlumb();

      const { result } = renderHook(() =>
        useMappedPlumbState({
          plumb,
          mapper: getDocument,
        }),
      );

      expect(result.current[0]).toBe(getDocument(initialState));
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

      const { result, waitForNextUpdate } = renderHook(() =>
        useMappedPlumbState({ plumb, mapper: getDocument }),
      );

      // dispatch first
      act(() => {
        nextValues.forEach((value) => plumb.next(value, 'tag'));
      });

      // then wait for updates
      nextValues.forEach(async (value) => {
        await waitForNextUpdate();
        expect(result.current[0]).toBe(getDocument(value));
        expect(result.current[1]).toBe('tag');
      });
    });
  });

  describe('Cleanup', () => {
    it('should unsubscribe from the plumb on unmount', () => {
      const plumb = makePlumb();

      const { unmount } = renderHook(() => useMappedPlumbState({ plumb, mapper: getDocument }));

      expect(plumb.subscribers.length).toBe(1);

      act(() => {
        unmount();
      });

      expect(plumb.subscribers.length).toBe(0);
    });
  });
});
