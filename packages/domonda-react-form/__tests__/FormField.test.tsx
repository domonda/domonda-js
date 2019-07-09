/**
 * @jest-environment jsdom
 */

import React from 'react';
import { FormContext } from '../src/FormContext';
import { useFormField, UseFormFieldProps } from '../src/FormField';
import { createForm } from '@domonda/form';
import get from 'lodash/get';

// t
import { renderHook, act } from '@testing-library/react-hooks';

interface DefaultValues {
  person: {
    [key: string]: {
      name: string;
    }[];
  };
}

const denis = {
  name: 'Denis',
};
const erik = {
  name: 'Erik',
};

const defaultValues: DefaultValues = {
  person: {
    '1f!rst': [denis],
    '2sec@nd': [erik],
  },
};

const pathToDenis = 'person.1f!rst[0]';
const pathToErik = 'person.2sec@nd[0]';

describe('Creation', () => {
  test('should properly instantiate form field', () => {
    const [form] = createForm(defaultValues);

    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const {
      result: { current: field },
    } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    expect(form.$.value.fields[path]).toBeDefined();
    expect(field.value).toBe(denis.name);
    expect(field.state.value).toBe(field.value);
    expect(field.state.defaultValue).toBe(denis.name);
    expect(field.state.changed).toBe(false);
    expect(field.state.validityMessage).toBe(null);
  });
});

describe('Update', () => {
  test('should properly handle field path change', () => {
    const [form] = createForm(defaultValues);

    let denisNamePath = pathToDenis + '.name';
    let erikNamePath = pathToErik + '.name';
    const initialProps: UseFormFieldProps<string> = { path: denisNamePath };

    const { result, rerender } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    act(() => rerender({ path: erikNamePath }));

    expect(result.current.value).toBe(erik.name);

    expect(form.$.value.fields[denisNamePath]).toBeUndefined();
    expect(form.$.value.fields[erikNamePath]).toBeDefined();
  });

  test('should get new value if changed on form', () => {
    const [form] = createForm(defaultValues);

    let path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const nextValue = 'New denis';

    act(() => {
      form.$.next({
        ...form.$.value,
        values: {
          person: {
            '1f!rst': [{ name: nextValue }],
          },
        },
      });
    });

    expect(result.current.value).toBe(nextValue);
  });

  test('should properly handle value update', () => {
    const [form] = createForm(defaultValues);

    let path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const nextValue = 'New denis';
    act(() => {
      result.current.setValue(nextValue);
    });

    expect(get(form.state.defaultValues, path)).toBe(denis.name);
    expect(get(form.values, path)).toBe(nextValue);
  });

  test('should reset to default value on reset call', () => {
    const [form] = createForm(defaultValues);

    let path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const nextValue = 'New denis';
    act(() => {
      result.current.setValue(nextValue);
    });

    expect(result.current.value).toBe(nextValue);

    act(() => {
      result.current.resetValue();
    });

    expect(result.current.state.defaultValue).toBe(result.current.value);
  });

  test('should call subscribers only when value changes', () => {
    const [form] = createForm(defaultValues);

    let path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const { result, rerender } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const spy = jest.fn();
    result.current.$.subscribe(spy);

    const nextValue = 'New denis';

    act(() => {
      result.current.setValue(nextValue);
    });

    act(() => {
      rerender(initialProps);
    });

    act(() => {
      result.current.setValue(nextValue);
    });

    // 2 times because of the initial value
    expect(spy).toBeCalledTimes(2);
  });
});

describe('Validation', () => {
  const [form] = createForm(defaultValues);
  const Wrapper: React.FC = ({ children }) => (
    <FormContext.Provider value={form}>{children}</FormContext.Provider>
  );
  const path = pathToDenis + '.name';

  test('should properly handle validation props', () => {
    const validationMessage = 'Very invalid!';
    const initialProps: UseFormFieldProps<string> = {
      path,
      immediateValidate: true,
      validate: () => validationMessage,
    };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: Wrapper,
    });

    expect(result.current.state.validityMessage).toBe(validationMessage);
  });
});

describe('Cleanup', () => {
  const [form] = createForm(defaultValues);
  const Wrapper: React.FC = ({ children }) => (
    <FormContext.Provider value={form}>{children}</FormContext.Provider>
  );

  test('should complete field stream on unmount', () => {
    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const {
      result: { current: field },
      unmount,
    } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    unmount();

    expect(spy).toBeCalled();
  });

  test('should complete previous field on path change', () => {
    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const {
      result: { current: field },
      rerender,
    } = renderHook(useFormField, {
      initialProps,
      wrapper: Wrapper,
    });

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    act(() => rerender({ path: pathToErik + '.name' }));

    expect(spy).toBeCalled();
  });

  test('should complete previous field on validation update', () => {
    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path, validate: () => null };

    const {
      result: { current: field },
      rerender,
    } = renderHook(useFormField, {
      initialProps,
      wrapper: Wrapper,
    });

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    act(() => rerender({ path, validate: () => null }));

    expect(spy).toBeCalled();
  });
});
