/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { createForm } from '@domonda/form';

import { FormContext } from '../src/FormContext';
import { useFormArrayField, UseFormArrayFieldProps } from '../src/FormArrayField';

describe('Creation', () => {
  it('should set field value to null without allowEmptyArray prop', () => {
    const [form] = createForm({ names: [] });

    const path = 'names';
    const initialProps: UseFormArrayFieldProps = { path };

    renderHook(useFormArrayField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    expect(form.values[path]).toEqual(null);
  });

  it('should set field value to empty array with allowEmptyArray prop', () => {
    const [form] = createForm({ names: null });

    const path = 'names';
    const initialProps: UseFormArrayFieldProps = { path, allowEmptyArray: true };

    renderHook(useFormArrayField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    expect(form.values[path]).toEqual([]);
  });
});

describe('Update', () => {
  it('should add empty array element on add action', () => {
    const [form] = createForm({ names: [] });

    const path = 'names';
    const initialProps: UseFormArrayFieldProps = { path };

    const { result } = renderHook(useFormArrayField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    act(() => {
      result.current.add();
    });

    expect(form.values[path]).toEqual([null]);
  });

  it('should remove last array element on remove action', () => {
    const [form] = createForm({ names: [1, 2] });

    const path = 'names';
    const initialProps: UseFormArrayFieldProps = { path };

    const { result } = renderHook(useFormArrayField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    act(() => {
      result.current.remove();
    });

    expect(form.values[path]).toEqual([1]);
  });

  it('should set field value to null when removing last array element without allowEmptyArray prop', () => {
    const [form] = createForm({ names: [1] });

    const path = 'names';
    const initialProps: UseFormArrayFieldProps = { path };

    const { result } = renderHook(useFormArrayField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    act(() => {
      result.current.remove();
    });

    expect(form.values[path]).toEqual(null);
  });

  it('should set field value to empty array when removing last array element with allowEmptyArray prop', () => {
    const [form] = createForm({ names: [1] });

    const path = 'names';
    const initialProps: UseFormArrayFieldProps = { path, allowEmptyArray: true };

    const { result } = renderHook(useFormArrayField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    act(() => {
      result.current.remove();
    });

    expect(form.values[path]).toEqual([]);
  });
});
