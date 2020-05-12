/**
 * @jest-environment jsdom
 */

import React from 'react';
import { PlumbState } from '../src/usePlumbState';
import { PlumbProvider, usePlumbContext } from '../src/PlumbContext';

// t
import { renderHook, act as hookAct } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

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

describe('PlumbProvider', () => {
  it('should provide current state to consumers', () => {
    const { result } = renderHook(() => usePlumbContext(), {
      wrapper: ({ children }) => (
        <PlumbProvider state={initialState} tag={undefined}>
          {children}
        </PlumbProvider>
      ),
    });

    expect(result.current.state).toBe(initialState);
  });

  describe('Update', () => {
    it('should publish state changes to consumers', () => {
      const spy = jest.fn((_0, _1) => null);

      const { rerender } = render(
        <PlumbProvider state={initialState} tag={undefined}>
          <div>
            <PlumbState>{spy}</PlumbState>
          </div>
        </PlumbProvider>,
      );

      const nextState: State = { document: { id: '856a8dc4' } };
      rerender(
        <PlumbProvider state={nextState} tag="tag">
          <div>
            <PlumbState>{spy}</PlumbState>
          </div>
        </PlumbProvider>,
      );

      expect(spy).toBeCalledTimes(3);

      // 1. initial
      expect(spy.mock.calls[0][0]).toBe(initialState);
      expect(spy.mock.calls[0][1]).toBe(undefined);

      // 2. rerender (changed value pass)

      // 3. publish next state
      expect(spy.mock.calls[2][0]).toBe(nextState);
      expect(spy.mock.calls[2][1]).toBe('tag');
    });
  });

  describe('Cleanup', () => {
    it('should dispose plumb on unmount', () => {
      const { result, unmount } = renderHook(() => usePlumbContext(), {
        wrapper: ({ children }) => (
          <PlumbProvider state={initialState} tag={undefined}>
            {children}
          </PlumbProvider>
        ),
      });

      hookAct(() => {
        unmount();
      });

      expect(result.current.disposed).toBeTruthy();
    });
  });
});
