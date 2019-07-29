/**
 * @jest-environment jsdom
 *
 * NOTE: we wrap some `expects` in a `setTimeout` because we want the current
 * event loop to finish (react render in this case) before checking the value
 *
 */

import React from 'react';
import { FormContext } from '../src/FormContext';
import { useFormField, UseFormFieldProps } from '../src/FormField';
import { createForm, Form } from '@domonda/form';
import get from 'lodash/get';

// t
import { renderHook, act } from '@testing-library/react-hooks';

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
  it('should properly instantiate form field', () => {
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
  it('should properly handle field path change', async (done) => {
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

    expect(result.current.value).toBe(denis.name);

    act(() => rerender({ path: erikNamePath }));

    setTimeout(() => {
      expect(result.current.value).toBe(erik.name);

      expect(form.$.value.fields[denisNamePath]).toBeUndefined();
      expect(form.$.value.fields[erikNamePath]).toBeDefined();

      done();
    }, 0);
  });

  it('should get new value if changed on form', (done) => {
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

    setTimeout(() => {
      expect(result.current.value).toBe(nextValue);
      done();
    }, 0);
  });

  it('should properly handle value update', () => {
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

  it('should reset to default value on reset call', async (done) => {
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

    setTimeout(() => {
      expect(result.current.value).toBe(nextValue);

      act(() => {
        result.current.resetValue();
      });

      setTimeout(() => {
        expect(result.current.state.defaultValue).toBe(result.current.value);
        done();
      }, 0);
    }, 0);
  });

  it('should call subscribers only when value changes', () => {
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

describe('Cleanup', () => {
  function makeForm<T extends object>(dv: T): [Form<T>, React.FC] {
    const [form] = createForm(dv);
    return [
      form,
      ({ children }) => <FormContext.Provider value={form}>{children}</FormContext.Provider>,
    ];
  }

  it('should complete field stream on unmount', () => {
    const [, wrapper] = makeForm(defaultValues);

    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const {
      result: { current: field },
      unmount,
    } = renderHook(useFormField, {
      initialProps,
      wrapper,
    });

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    unmount();

    expect(spy).toBeCalled();
  });

  it('should complete previous field on path change', () => {
    const [, wrapper] = makeForm(defaultValues);

    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const {
      result: { current: field },
      rerender,
    } = renderHook(useFormField, {
      initialProps,
      wrapper,
    });

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    act(() => rerender({ path: pathToErik + '.name' }));

    expect(spy).toBeCalled();
  });

  it('should complete previous field on validation update', () => {
    const [, wrapper] = makeForm(defaultValues);

    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path, validate: () => null };

    const {
      result: { current: field },
      rerender,
    } = renderHook(useFormField, {
      initialProps,
      wrapper,
    });

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    act(() => rerender({ path, validate: () => null }));

    expect(spy).toBeCalled();
  });
});
