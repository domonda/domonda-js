/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { useDeepMemoOnValue } from '../src/useMemoOnValue';

it('should create deep memo value', () => {
  const { result } = renderHook(() => useDeepMemoOnValue({ test: 0 }));

  expect(result.current).toMatchObject({ test: 0 });
});

it('should retain reference to same value', () => {
  const initialProps = { test: 0 };
  const { result } = renderHook(useDeepMemoOnValue, { initialProps });

  expect(result.current).toBe(initialProps);
});

it('should retain reference to same value even if object is re-created', () => {
  const initialProps: any = { test: 0 };
  const { result, rerender } = renderHook(useDeepMemoOnValue, { initialProps });

  expect(result.current).toBe(initialProps);

  act(() => rerender({ ...initialProps }));

  expect(result.current).toBe(initialProps);
});

it('should change when deep value changes', () => {
  const initialProps: any = { test: 0 };
  const { result, rerender } = renderHook(useDeepMemoOnValue, { initialProps });

  expect(result.current).toBe(initialProps);

  const nextProps: any = { test: 1 };
  act(() => rerender(nextProps));

  expect(result.current).toBe(nextProps);
});

it('should change when deep value changes and retain the reference on same deep values', () => {
  const initialProps: any = { test: 0 };
  const { result, rerender } = renderHook(useDeepMemoOnValue, { initialProps });

  expect(result.current).toBe(initialProps);

  const nextProps: any = { test: 1 };
  act(() => rerender(nextProps));

  expect(result.current).toBe(nextProps);

  act(() => rerender({ ...nextProps }));

  expect(result.current).toBe(nextProps);
});
