/**
 * @jest-environment jsdom
 */

import React from 'react';
import { FormContext } from '../src/FormContext';
import { createForm } from '@domonda/form';
import get from 'lodash/get';
import {
  useFormState,
  defaultValuesSelector,
  makeDefaultValueSelector,
  valuesSelector,
  makeValueSelector,
  submitErrorSelector,
  submittingSelector,
  FormState,
} from '../src/FormState';

// t
import { renderHook, act } from '@testing-library/react-hooks';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

const valueAtPath = {};

const defaultValues = {
  some: [
    {
      12: {
        '%@$': {
          obj: valueAtPath,
        },
      },
    },
  ],
};

const path = 'some[0].12.%@$.obj';

describe('Selectors', () => {
  const [form] = createForm(defaultValues);
  const wrapper: React.FC = ({ children }) => (
    <FormContext.Provider value={form}>{children}</FormContext.Provider>
  );

  test('should get default values for related selector', () => {
    const {
      result: {
        current: [value],
      },
    } = renderHook(useFormState, {
      initialProps: defaultValuesSelector,
      wrapper,
    });

    expect(value).toBe(form.state.defaultValues);
  });

  test('should get default value at path for related selector', () => {
    const {
      result: {
        current: [value],
      },
    } = renderHook(useFormState, {
      initialProps: makeDefaultValueSelector<object>(path),
      wrapper,
    });

    expect(value).toBe(get(form.state.defaultValues, path));
  });

  test('should get values for related selector', () => {
    const {
      result: {
        current: [value],
      },
    } = renderHook(useFormState, {
      initialProps: valuesSelector,
      wrapper,
    });

    expect(value).toBe(form.values);
  });

  test('should get value at path for related selector', () => {
    const {
      result: {
        current: [value],
      },
    } = renderHook(useFormState, {
      initialProps: makeValueSelector<object>(path),
      wrapper,
    });

    expect(value).toBe(get(form.values, path));
  });

  test('should get submit error for related selector', () => {
    const {
      result: {
        current: [value],
      },
    } = renderHook(useFormState, {
      initialProps: submitErrorSelector,
      wrapper,
    });

    expect(value).toBe(form.state.submitError);
  });

  test('should get submitting flag for related selector', () => {
    const {
      result: {
        current: [value],
      },
    } = renderHook(useFormState, {
      initialProps: submittingSelector,
      wrapper,
    });

    expect(value).toBe(form.state.submitting);
  });
});

describe('Updating', () => {
  const [form] = createForm(defaultValues);
  const Wrapper: React.FC = ({ children }) => (
    <FormContext.Provider value={form}>{children}</FormContext.Provider>
  );

  test('should update when selected value changes', () => {
    const [field] = form.makeFormField(path);

    const valueSelector = makeValueSelector<object>(path);
    const { result } = renderHook(useFormState, {
      initialProps: valueSelector,
      wrapper: Wrapper,
    });

    expect(result.current[0]).toBe(get(form.values, path));

    const nextValue = { n: 'v' };
    act(() => {
      field.setValue(nextValue);
    });

    expect(result.current[0]).toBe(nextValue);
  });

  test('should not update when selected value stays the same', () => {
    const [field] = form.makeFormField(path);
    const valueSelector = makeValueSelector<object>(path);

    const spy = jest.fn(() => <div />);

    const Tree = <FormState selector={valueSelector}>{spy}</FormState>;

    const { rerender } = render(Tree, {
      wrapper: Wrapper,
    });

    field.setValue(get(form.values, path));

    rerender(Tree);

    expect(spy).toBeCalledTimes(1);
  });
});
