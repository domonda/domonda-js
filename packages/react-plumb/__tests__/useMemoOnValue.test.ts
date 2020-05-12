/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { useShallowMemoOnValue, useDeepMemoOnValue } from '../src/useMemoOnValue';

describe('useShallowMemoOnValue', () => {
  it('should create memo value', () => {
    const { result } = renderHook(() => useShallowMemoOnValue({ test: 0 }));

    expect(result.current).toMatchObject({ test: 0 });
  });

  it('should retain reference to same value when creating', () => {
    const initialProps = { test: 0 };
    const { result } = renderHook(useShallowMemoOnValue, { initialProps });

    expect(result.current).toBe(initialProps);
  });

  it('should retain reference to same value even if empty object is recreated', () => {
    const initialProps = {};
    const { result, rerender } = renderHook(useShallowMemoOnValue, { initialProps });

    act(() => {
      rerender({});
    });

    expect(result.current).toBe(initialProps);
  });

  it('should retain reference to same value even if object is re-created', () => {
    const initialProps: any = { test: 0 };
    const { result, rerender } = renderHook(useShallowMemoOnValue, { initialProps });

    expect(result.current).toBe(initialProps);

    act(() => rerender({ ...initialProps }));

    expect(result.current).toBe(initialProps);
  });

  it('should change when shallow value changes', () => {
    const initialProps: any = { test: 0 };
    const { result, rerender } = renderHook(useShallowMemoOnValue, { initialProps });

    expect(result.current).toBe(initialProps);

    const nextProps: any = { test: 1 };
    act(() => rerender(nextProps));

    expect(result.current).toBe(nextProps);
  });

  it('should change when shallow value changes and retain the reference on same values', () => {
    const initialProps: any = { test: 0 };
    const { result, rerender } = renderHook(useShallowMemoOnValue, { initialProps });

    expect(result.current).toBe(initialProps);

    const nextProps: any = { test: 1 };
    act(() => rerender(nextProps));

    expect(result.current).toBe(nextProps);

    act(() => rerender({ ...nextProps }));

    expect(result.current).toBe(nextProps);
  });
});

describe('useDeepMemoOnValue', () => {
  it('should create memo value', () => {
    const { result } = renderHook(() =>
      useDeepMemoOnValue({ test: { on: { deep: { value: 0 } } } }),
    );

    expect(result.current).toMatchObject({ test: { on: { deep: { value: 0 } } } });
  });

  it('should retain reference to same value when creating', () => {
    const initialProps = { test: { on: { deep: { value: 0 } } } };
    const { result } = renderHook(useDeepMemoOnValue, { initialProps });

    expect(result.current).toBe(initialProps);
  });

  it('should retain reference to same value even if empty object is recreated', () => {
    const initialProps = {};
    const { result, rerender } = renderHook(useDeepMemoOnValue, { initialProps });

    act(() => {
      rerender({});
    });

    expect(result.current).toBe(initialProps);
  });

  it('should retain reference to same value even if object is re-created', () => {
    const initialProps: any = { test: { on: { deep: { value: 0 } } } };
    const { result, rerender } = renderHook(useDeepMemoOnValue, { initialProps });

    expect(result.current).toBe(initialProps);

    act(() => rerender({ ...initialProps }));

    expect(result.current).toBe(initialProps);
  });

  it('should change when shallow value changes', () => {
    const initialProps: any = { test: { on: { deep: { value: 0 } } } };
    const { result, rerender } = renderHook(useDeepMemoOnValue, { initialProps });

    expect(result.current).toBe(initialProps);

    const nextProps: any = { test: { on: { deep: { value: 1 } } } };
    act(() => rerender(nextProps));

    expect(result.current).toBe(nextProps);
  });

  it('should change when shallow value changes and retain the reference on same values', () => {
    const initialProps: any = { test: { on: { deep: { value: 0 } } } };
    const { result, rerender } = renderHook(useDeepMemoOnValue, { initialProps });

    expect(result.current).toBe(initialProps);

    const nextProps: any = { test: { on: { deep: { value: 1 } } } };
    act(() => rerender(nextProps));

    expect(result.current).toBe(nextProps);

    act(() => rerender({ ...nextProps }));

    expect(result.current).toBe(nextProps);
  });
});
