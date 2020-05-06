/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createPlumb } from '@domonda/plumb';
import { useMappedPlumbState, usePlumbState } from '../src/usePlumbState';
import { PlumbContext } from '../src/PlumbContext';

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
    it('should dispatch initial value when supplied', () => {
      const plumb = makePlumb();

      const { result } = renderHook(() =>
        useMappedPlumbState({
          plumb,
          mapper: getDocument,
        }),
      );

      expect(result.current[0]).toBe(getDocument(plumb.state));
    });

    it('should use plumb from context', () => {
      const plumb = makePlumb();

      const { result } = renderHook(() => useMappedPlumbState({ mapper: getDocument }), {
        wrapper: ({ children }) => (
          <PlumbContext.Provider value={plumb}>{children}</PlumbContext.Provider>
        ),
      });

      expect(result.current[0]).toBe(getDocument(plumb.state));
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

    it('should dispatch all nexted values to plumb in context', async () => {
      const plumb = makePlumb();

      const { result, waitForNextUpdate } = renderHook(
        () => useMappedPlumbState({ mapper: getDocument }),
        {
          wrapper: ({ children }) => (
            <PlumbContext.Provider value={plumb}>{children}</PlumbContext.Provider>
          ),
        },
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

    it('should update only when value changes', () => {
      const initialState = { id: '1' };
      const plumb = createPlumb(initialState);

      const { result, rerender } = renderHook(() => usePlumbState(), {
        wrapper: ({ children }) => (
          <PlumbContext.Provider value={plumb}>{children}</PlumbContext.Provider>
        ),
      });

      act(() => {
        plumb.next(
          {
            id: '1',
          },
          undefined,
        );
      });

      rerender();

      expect(result.current[0]).toBe(initialState);
    });

    it('should update only when mapped value changes', () => {
      const plumb = makePlumb();

      const { result, rerender } = renderHook(() => useMappedPlumbState({ mapper: getDocument }), {
        wrapper: ({ children }) => (
          <PlumbContext.Provider value={plumb}>{children}</PlumbContext.Provider>
        ),
      });

      act(() => {
        plumb.next(
          {
            document: {
              id: '216d993e',
            },
          },
          undefined,
        );
      });

      rerender();

      expect(result.current[0]).toBe(getDocument(initialState));
    });

    it('should ignore tag changes when value stays the same', () => {
      const initialState = { id: '1' };
      const plumb = createPlumb(initialState);

      const { result, rerender } = renderHook(() => usePlumbState(), {
        wrapper: ({ children }) => (
          <PlumbContext.Provider value={plumb}>{children}</PlumbContext.Provider>
        ),
      });

      act(() => {
        plumb.next(
          {
            id: '1',
          },
          'other-tag',
        );
      });

      rerender();

      expect(result.current[0]).toBe(initialState);
    });

    it('should ignore tag changes when mapped value stays the same', () => {
      const plumb = makePlumb();

      const { result, rerender } = renderHook(() => useMappedPlumbState({ mapper: getDocument }), {
        wrapper: ({ children }) => (
          <PlumbContext.Provider value={plumb}>{children}</PlumbContext.Provider>
        ),
      });

      act(() => {
        plumb.next(
          {
            document: {
              id: '216d993e',
            },
          },
          'other-tag',
        );
      });

      rerender();

      expect(result.current[0]).toBe(getDocument(initialState));
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
