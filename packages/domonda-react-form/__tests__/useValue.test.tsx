/**
 * @jest-environment jsdom
 */

import { useValue } from '../src/hooks/rxjs';
import { BehaviorSubject } from 'rxjs';

// t
import { renderHook, act } from '@testing-library/react-hooks';
import { map } from 'rxjs/operators';

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

function make$() {
  return new BehaviorSubject(initialState);
}

const getDocument = ({ document }: State) => document;

describe('Creation', () => {
  it('should dispatch initial value when supplied', async () => {
    const $ = make$();

    const { result } = renderHook(() =>
      useValue(() => $.pipe(map(getDocument)), () => getDocument($.value)),
    );

    expect(result.current).toBe(getDocument(initialState));
  });

  it('should dispatch undefined and then next value if initial value is not supplied', async () => {
    const $ = make$();

    const { result, waitForNextUpdate } = renderHook(() =>
      useValue(() => $.pipe(map(getDocument))),
    );

    expect(result.current).toBeUndefined();

    await waitForNextUpdate();

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

  it('should make observable only once', async () => {
    const spiedMakeObservable = jest.fn(() => $);

    const $ = make$();

    const { rerender, waitForNextUpdate } = renderHook(() => useValue(spiedMakeObservable));

    // rerender
    act(() => {
      rerender();
    });

    // dispatch values
    nextValues.forEach((value) => $.next(value));

    // wait for dispatched updates
    nextValues.forEach(async () => await waitForNextUpdate());

    expect(spiedMakeObservable).toBeCalledTimes(1);
  });

  it('should get initial state only once', async () => {
    const spiedGetDocument = jest.fn(getDocument);

    const $ = make$();

    const { rerender, waitForNextUpdate } = renderHook(() =>
      useValue(() => $.pipe(map(getDocument)), () => spiedGetDocument($.value)),
    );

    // rerender
    act(() => {
      rerender();
    });

    // dispatch values
    nextValues.forEach((value) => $.next(value));

    // wait for dispatched updates
    nextValues.forEach(async () => await waitForNextUpdate());

    expect(spiedGetDocument).toBeCalledTimes(1);
  });

  it('should dispatch all nexted values', async () => {
    const $ = make$();

    const { result, waitForNextUpdate } = renderHook(() =>
      useValue(() => $.pipe(map(getDocument)), () => getDocument($.value)),
    );

    // dispatch first
    nextValues.forEach((value) => $.next(value));

    // then wait for updates
    nextValues.forEach(async (value) => {
      await waitForNextUpdate();
      expect(result.current).toBe(getDocument(value));
    });
  });
});

describe('Cleanup', () => {
  it('should unsubscribe from the stream on unmount', () => {
    const $ = make$();

    const { unmount } = renderHook(() => useValue(() => $));

    expect($.observers.length).toBe(1);

    unmount();

    expect($.observers.length).toBe(0);
  });
});
