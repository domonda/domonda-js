/**
 * @jest-environment jsdom
 */

import React from 'react';
import { FormContext } from '../src/FormContext';
import { createForm, Form as RxForm, FormConfig } from '@domonda/form';
import get from 'lodash/get';
import {
  useFormState,
  defaultValuesSelector,
  makeDefaultValueSelector,
  valuesSelector,
  makeValueSelector,
  submitErrorSelector,
  submittingSelector,
  changedSelector,
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

type DefaultValues = typeof defaultValues;

const path = 'some[0].12.%@$.obj';

function makeForm(config?: FormConfig<DefaultValues>): [RxForm<DefaultValues>, React.FC] {
  const [form] = createForm(defaultValues, config);
  return [
    form,
    ({ children }) => <FormContext.Provider value={form}>{children}</FormContext.Provider>,
  ];
}

describe('Selectors', () => {
  it('should get default values for related selector', () => {
    const [form, wrapper] = makeForm();

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

  it('should get default value at path for related selector', () => {
    const [form, wrapper] = makeForm();

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

  it('should get values for related selector', () => {
    const [form, wrapper] = makeForm();

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

  it('should get value at path for related selector', () => {
    const [form, wrapper] = makeForm();

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

  it('should get submit error for related selector', () => {
    const [form, wrapper] = makeForm();

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

  it('should get submitting flag for related selector', () => {
    const [form, wrapper] = makeForm();

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

  it('should get changed for related selector', () => {
    const [form, wrapper] = makeForm();

    const [field] = form.makeFormField(path);

    const { result } = renderHook(useFormState, {
      initialProps: changedSelector,
      wrapper,
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      field.setValue({ te: 'st' });
    });

    expect(result.current[0]).toBe(true);
  });
});

describe('Updating', () => {
  it('should update when selected value changes', () => {
    const [form, wrapper] = makeForm();

    const [field] = form.makeFormField(path);

    const valueSelector = makeValueSelector<object>(path);
    const { result } = renderHook(useFormState, {
      initialProps: valueSelector,
      wrapper,
    });

    expect(result.current[0]).toBe(get(form.values, path));

    const nextValue = { n: 'v' };
    act(() => {
      field.setValue(nextValue);
    });

    expect(result.current[0]).toBe(nextValue);
  });

  it('should not update when selected value stays the same', () => {
    const [form, wrapper] = makeForm();

    const [field] = form.makeFormField(path);
    const valueSelector = makeValueSelector<object>(path);

    const spy = jest.fn(() => <div />);

    const Tree = <FormState selector={valueSelector}>{spy}</FormState>;

    const { rerender } = render(Tree, {
      wrapper,
    });

    field.setValue(get(form.values, path));

    rerender(Tree);

    expect(spy).toBeCalledTimes(1);
  });
});
