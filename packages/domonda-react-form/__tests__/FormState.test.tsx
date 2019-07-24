/**
 * @jest-environment jsdom
 */

import React from 'react';
import { FormContext } from '../src/FormContext';
import { createForm, Form as RxForm, FormConfig, FormField } from '@domonda/form';
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
  FormChangedState,
} from '../src/FormState';
import { Form } from '../src/Form';

// t
import { renderHook, act } from '@testing-library/react-hooks';
import { render, cleanup } from '@testing-library/react';

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

  it('should correctly handle changed status when default values change', (done) => {
    const spy = jest.fn((_0) => null);

    const dv = {
      some: {
        path: 'toavalue',
      },
    };

    let form: RxForm<typeof dv>;

    const { rerender } = render(
      <Form getForm={(f) => (form = f)} defaultValues={dv} resetOnDefaultValuesChange>
        <FormChangedState>{spy}</FormChangedState>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    let field: FormField<unknown>;
    act(() => {
      [field] = form.makeFormField('some.path');
    });

    // @ts-ignore because field should indeed be set here
    if (!field) {
      throw new Error('field instance should be set here!');
    }

    act(() => {
      field.setValue('differentvalue');
    });

    rerender(
      <Form defaultValues={{ some: { path: 'toanothervalue' } }} resetOnDefaultValuesChange>
        <FormChangedState>{spy}</FormChangedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(3);
    expect(spy.mock.calls[0][0]).toBeFalsy();
    expect(spy.mock.calls[1][0]).toBeTruthy();
    expect(spy.mock.calls[2][0]).toBeFalsy();
    done();
  });

  it('should correctly handle changed status when the path to a field does not exist on default values update', () => {
    const spy = jest.fn((_0) => null);

    let form: RxForm<DefaultValues>;

    const { rerender } = render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues} resetOnDefaultValuesChange>
        <FormChangedState>{spy}</FormChangedState>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    let field: FormField<unknown>;
    act(() => {
      [field] = form.makeFormField(path);
    });

    // @ts-ignore because field should indeed be set here
    if (!field) {
      throw new Error('field instance should be set here!');
    }

    act(() => {
      field.setValue({ te: 'st' });
    });

    rerender(
      <Form defaultValues={{ te: 'st' }} resetOnDefaultValuesChange>
        <FormChangedState>{spy}</FormChangedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(3);
    expect(spy.mock.calls[0][0]).toBeFalsy();
    expect(spy.mock.calls[1][0]).toBeTruthy();
    expect(spy.mock.calls[2][0]).toBeTruthy();
  });
});
