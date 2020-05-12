/**
 * @jest-environment jsdom
 */

import { useMemoRenderer } from '../src/hooks';

// t
import { renderHook } from '@testing-library/react-hooks';

it('should not re-render component when props are shallowly equal', () => {
  const render = jest.fn(() => null);
  const initialProps = { te: 'st' };

  const { rerender } = renderHook((props) => useMemoRenderer(props, render), { initialProps });

  // equal
  rerender({ ...initialProps });

  // different
  rerender({ te: 'sting' });

  expect(render).toBeCalledTimes(2);
});

it('should obey the custom `propsAreEqual` function', () => {
  const render = jest.fn(() => null);

  const { rerender } = renderHook((props) => useMemoRenderer(props, render, () => true), {
    initialProps: { '1': 2 } as {},
  });

  // same
  rerender({ '1': 2 });

  // different
  rerender({ '3': 4 });
  rerender({ '5': 6 });

  expect(render).toBeCalledTimes(1);
});
