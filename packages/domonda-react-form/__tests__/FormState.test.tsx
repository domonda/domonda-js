/**
 * @jest-environment jsdom
 *
 * NOTE: we wrap some `expects` in a `setTimeout` because we want the current
 * event loop to finish (react render in this case) before checking the value
 *
 */

import React from 'react';
import { FormContext } from '../src/FormContext';
import { createForm, Form as DomondaForm, FormConfig, FormField } from '@domonda/form';
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
  FormSubmittingState,
  FormLockedState,
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

function makeForm(config?: FormConfig<DefaultValues>): [DomondaForm<DefaultValues>, React.FC] {
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

  it('should get changed for related selector', (done) => {
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

    setTimeout(() => {
      expect(result.current[0]).toBe(true);
      done();
    }, 0);
  });
});

describe('Updating', () => {
  it('should update when selected value changes', (done) => {
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

    setTimeout(() => {
      expect(result.current[0]).toBe(nextValue);
      done();
    }, 0);
  });

  it('should not update when selected value stays the same', (done) => {
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

    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      done();
    }, 0);
  });

  it('should correctly handle changed status when default values change', (done) => {
    const spy = jest.fn((_0) => null);

    const dv = {
      some: {
        path: 'toavalue',
      },
    };

    let form: DomondaForm<typeof dv>;

    let { rerender } = render(
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

    setTimeout(() => {
      rerender(
        <Form defaultValues={{ some: { path: 'toanothervalue' } }} resetOnDefaultValuesChange>
          <FormChangedState>{spy}</FormChangedState>
        </Form>,
      );

      setTimeout(() => {
        expect(spy).toBeCalledTimes(4);
        expect(spy.mock.calls[0][0]).toBeFalsy();
        expect(spy.mock.calls[1][0]).toBeTruthy();
        expect(spy.mock.calls[2][0]).toBeTruthy(); // settling
        expect(spy.mock.calls[3][0]).toBeFalsy();

        done();
      }, 0);
    }, 0);
  });

  it('should correctly handle changed status when the path to a field does not exist on default values update', (done) => {
    const spy = jest.fn((_0) => null);

    let form: DomondaForm<DefaultValues>;

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

    setTimeout(() => {
      rerender(
        <Form defaultValues={{ te: 'st' }} resetOnDefaultValuesChange>
          <FormChangedState>{spy}</FormChangedState>
        </Form>,
      );

      setTimeout(() => {
        expect(spy).toBeCalledTimes(4);
        expect(spy.mock.calls[0][0]).toBeFalsy();
        expect(spy.mock.calls[1][0]).toBeTruthy();
        expect(spy.mock.calls[2][0]).toBeTruthy(); // settling
        expect(spy.mock.calls[3][0]).toBeFalsy();

        done();
      }, 0);
    }, 0);
  });

  it('should correctly handle changed status when submitting and default values update', async (done) => {
    const spy = jest.fn((_0) => null);

    let form: DomondaForm<DefaultValues>;

    const submit = () => new Promise((resolve) => setTimeout(() => resolve, 0));

    const { rerender } = render(
      <Form
        getForm={(f) => (form = f)}
        onSubmit={submit}
        defaultValues={defaultValues}
        resetOnDefaultValuesChange
      >
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
      field.setValue('denis');
    });

    await form.submit();

    setTimeout(() => {
      rerender(
        <Form onSubmit={submit} defaultValues={{ te: 'st' }} resetOnDefaultValuesChange>
          <FormChangedState>{spy}</FormChangedState>
        </Form>,
      );

      setTimeout(() => {
        expect(spy).toBeCalledTimes(4);
        expect(spy.mock.calls[0][0]).toBeFalsy();
        expect(spy.mock.calls[1][0]).toBeTruthy();
        expect(spy.mock.calls[3][0]).toBeFalsy();

        done();
      }, 0);
    }, 0);
  });

  it('should correctly handle nested states with changed status default values update', async (done) => {
    const spy = jest.fn((_0) => null);

    let form: DomondaForm<DefaultValues>;

    const submit = () => Promise.resolve;

    const { rerender } = render(
      <Form
        getForm={(f) => (form = f)}
        onSubmit={submit}
        defaultValues={defaultValues}
        resetOnDefaultValuesChange
      >
        <FormChangedState>
          {(changed) => (
            <FormSubmittingState>
              {(submitting) => spy({ submitting, changed })}
            </FormSubmittingState>
          )}
        </FormChangedState>
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
      field.setValue('denis');
    });

    await form.submit();

    setTimeout(() => {
      rerender(
        <Form onSubmit={submit} defaultValues={{ te: 'st' }} resetOnDefaultValuesChange>
          <FormChangedState>
            {(changed) => (
              <FormSubmittingState>
                {(submitting) => spy({ submitting, changed })}
              </FormSubmittingState>
            )}
          </FormChangedState>
        </Form>,
      );

      setTimeout(() => {
        expect(spy).toBeCalledTimes(6);
        expect(spy.mock.calls[0][0]).toEqual({
          submitting: false,
          changed: false,
        }); // init
        expect(spy.mock.calls[1][0]).toEqual({
          submitting: false,
          changed: true,
        }); // field.setValue
        expect(spy.mock.calls[2][0]).toEqual({
          submitting: true,
          changed: true,
        }); // form.submit
        expect(spy.mock.calls[3][0]).toEqual({
          submitting: true,
          changed: true,
        }); // settling
        expect(spy.mock.calls[4][0]).toEqual({
          submitting: false,
          changed: true,
        }); // form.submit completes
        expect(spy.mock.calls[5][0]).toEqual({
          submitting: false,
          changed: false,
        }); // default values change

        done();
      }, 0);
    }, 0);
  });

  it('should handle locked locked while submitting and changing default values', async (done) => {
    const spy = jest.fn((_0) => null);

    let form: DomondaForm<DefaultValues>;

    const submit = () => Promise.resolve;

    const { rerender } = render(
      <Form
        getForm={(f) => (form = f)}
        onSubmit={submit}
        defaultValues={defaultValues}
        resetOnDefaultValuesChange
      >
        <FormLockedState>{spy}</FormLockedState>
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
      field.setValue('denis');
    });

    await form.submit();

    setTimeout(() => {
      rerender(
        <Form onSubmit={submit} defaultValues={{ te: 'st' }} resetOnDefaultValuesChange>
          <FormLockedState>{spy}</FormLockedState>
        </Form>,
      );

      setTimeout(() => {
        expect(spy).toBeCalledTimes(6);
        expect(spy.mock.calls[0][0]).toBeTruthy(); // init
        expect(spy.mock.calls[1][0]).toBeFalsy(); // changed
        expect(spy.mock.calls[2][0]).toBeTruthy(); // form.submit
        expect(spy.mock.calls[3][0]).toBeTruthy(); // react render cycle
        expect(spy.mock.calls[4][0]).toBeFalsy(); // react render cycle? not sure - needs investigating
        expect(spy.mock.calls[5][0]).toBeTruthy(); // settling

        done();
      }, 0);
    }, 0);
  });
});
