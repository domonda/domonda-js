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
import { renderHook, act as hookAct } from '@testing-library/react-hooks';
import { render, act } from '@testing-library/react';

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
      initialProps: makeDefaultValueSelector<Record<string, any>>(path),
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
      initialProps: makeValueSelector<Record<string, any>>(path),
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

    hookAct(() => {
      field.setValue({ te: 'st' });
    });

    expect(result.current[0]).toBe(true);
  });
});

describe('Updating', () => {
  it('should update when selected value changes', () => {
    const [form, wrapper] = makeForm();

    const [field] = form.makeFormField(path);

    const valueSelector = makeValueSelector<Record<string, any>>(path);
    const { result } = renderHook(useFormState, {
      initialProps: valueSelector,
      wrapper,
    });

    expect(result.current[0]).toBe(get(form.values, path));

    const nextValue = { n: 'v' };
    hookAct(() => {
      field.setValue(nextValue);
    });

    expect(result.current[0]).toBe(nextValue);
  });

  it('should not update when selected value stays the same', () => {
    const [form, wrapper] = makeForm();

    const [field] = form.makeFormField(path);
    const valueSelector = makeValueSelector<Record<string, any>>(path);

    const spy = jest.fn(() => <div />);

    const Tree = <FormState selector={valueSelector}>{spy}</FormState>;

    const { rerender } = render(Tree, {
      wrapper,
    });

    field.setValue(get(form.values, path));

    rerender(Tree);

    expect(spy).toBeCalledTimes(1);
  });

  it('should correctly handle changed status when default values change', () => {
    const spy = jest.fn((_0) => null);

    const dv = {
      some: {
        path: 'toavalue',
      },
    };

    let form: DomondaForm<typeof dv>;

    const { rerender } = render(
      <Form getForm={(f) => (form = f)} resetOnDefaultValuesChange defaultValues={dv}>
        <FormChangedState>{spy}</FormChangedState>
      </Form>,
    );

    // @ts-expect-error: because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    let field: FormField<unknown>;
    act(() => {
      [field] = form.makeFormField('some.path');
    });

    // @ts-expect-error: because field should indeed be set here
    if (!field) {
      throw new Error('field instance should be set here!');
    }

    act(() => {
      field.setValue('differentvalue');
    });

    rerender(
      <Form resetOnDefaultValuesChange defaultValues={{ some: { path: 'toanothervalue' } }}>
        <FormChangedState>{spy}</FormChangedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(4);
    expect(spy.mock.calls[0][0]).toBeFalsy();
    expect(spy.mock.calls[1][0]).toBeTruthy();
    expect(spy.mock.calls[2][0]).toBeTruthy(); // react
    expect(spy.mock.calls[3][0]).toBeFalsy();
  });

  it('should correctly handle changed status when the path to a field does not exist on default values update', () => {
    const spy = jest.fn((_0) => null);

    let form: DomondaForm<DefaultValues>;

    const { rerender } = render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues} resetOnDefaultValuesChange>
        <FormChangedState>{spy}</FormChangedState>
      </Form>,
    );

    // @ts-expect-error: because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    let field: FormField<unknown>;
    act(() => {
      [field] = form.makeFormField(path);
    });

    // @ts-expect-error: because field should indeed be set here
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

    expect(spy).toBeCalledTimes(4);
    expect(spy.mock.calls[0][0]).toBeFalsy();
    expect(spy.mock.calls[1][0]).toBeTruthy();
    expect(spy.mock.calls[2][0]).toBeTruthy(); // react
    expect(spy.mock.calls[3][0]).toBeFalsy();
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

    // @ts-expect-error: because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    let field: FormField<unknown>;
    act(() => {
      [field] = form.makeFormField(path);
    });

    // @ts-expect-error: because field should indeed be set here
    if (!field) {
      throw new Error('field instance should be set here!');
    }

    act(() => {
      field.setValue('denis');
    });

    await form.submit();

    rerender(
      <Form onSubmit={submit} defaultValues={{ te: 'st' }} resetOnDefaultValuesChange>
        <FormChangedState>{spy}</FormChangedState>
      </Form>,
    );

    setTimeout(() => {
      expect(spy).toBeCalledTimes(4);
      expect(spy.mock.calls[0][0]).toBeFalsy();
      expect(spy.mock.calls[1][0]).toBeTruthy();
      expect(spy.mock.calls[2][0]).toBeTruthy(); // react
      expect(spy.mock.calls[3][0]).toBeFalsy();

      done();
    }, 0);
  });

  it('should correctly handle nested states with changed status default values update', async () => {
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

    // @ts-expect-error: because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    let field: FormField<unknown>;
    act(() => {
      [field] = form.makeFormField(path);
    });

    // @ts-expect-error: because field should indeed be set here
    if (!field) {
      throw new Error('field instance should be set here!');
    }

    act(() => {
      field.setValue('denis');
    });

    await act(async () => {
      await form.submit();
    });

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
      submitting: false,
      changed: true,
    }); // react
    expect(spy.mock.calls[4][0]).toEqual({
      submitting: false,
      changed: true,
    }); // form.submit completes
    expect(spy.mock.calls[5][0]).toEqual({
      submitting: false,
      changed: false,
    }); // default values change
  });

  it("should handle locked state when the form's disabled or readOnly is toggled", () => {
    const spy = jest.fn((_0) => null);

    let form: DomondaForm<DefaultValues>;

    const { rerender } = render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues} resetOnDefaultValuesChange>
        <FormLockedState>{spy}</FormLockedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBeTruthy();

    // @ts-expect-error: because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    let field: FormField<unknown>;
    act(() => {
      [field] = form.makeFormField(path);
    });

    // @ts-expect-error: because field should indeed be set here
    if (!field) {
      throw new Error('field instance should be set here!');
    }

    act(() => {
      field.setValue('denis');
    });

    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[1][0]).toBeFalsy();

    rerender(
      <Form
        disabled
        getForm={(f) => (form = f)}
        defaultValues={defaultValues}
        resetOnDefaultValuesChange
      >
        <FormLockedState>{spy}</FormLockedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(4);
    expect(spy.mock.calls[2][0]).toBeFalsy(); // react
    expect(spy.mock.calls[3][0]).toBeTruthy();

    rerender(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues} resetOnDefaultValuesChange>
        <FormLockedState>{spy}</FormLockedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(6);
    expect(spy.mock.calls[4][0]).toBeTruthy(); // react
    expect(spy.mock.calls[5][0]).toBeFalsy();

    rerender(
      <Form
        readOnly
        getForm={(f) => (form = f)}
        defaultValues={defaultValues}
        resetOnDefaultValuesChange
      >
        <FormLockedState>{spy}</FormLockedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(8);
    expect(spy.mock.calls[6][0]).toBeFalsy(); // react
    expect(spy.mock.calls[7][0]).toBeTruthy();

    rerender(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues} resetOnDefaultValuesChange>
        <FormLockedState>{spy}</FormLockedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(10);
    expect(spy.mock.calls[8][0]).toBeTruthy(); // react
    expect(spy.mock.calls[9][0]).toBeFalsy();
  });

  it('should handle locked state while submitting and changing default values', async () => {
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

    // @ts-expect-error: because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    let field: FormField<unknown>;
    act(() => {
      [field] = form.makeFormField(path);
    });

    // @ts-expect-error: because field should indeed be set here
    if (!field) {
      throw new Error('field instance should be set here!');
    }

    act(() => {
      field.setValue('denis');
    });

    await act(async () => {
      await form.submit();
    });

    rerender(
      <Form onSubmit={submit} defaultValues={{ te: 'st' }} resetOnDefaultValuesChange>
        <FormLockedState>{spy}</FormLockedState>
      </Form>,
    );

    expect(spy).toBeCalledTimes(6);
    expect(spy.mock.calls[0][0]).toBeTruthy(); // init
    expect(spy.mock.calls[1][0]).toBeFalsy(); // changed
    expect(spy.mock.calls[2][0]).toBeTruthy(); // form.submit
    expect(spy.mock.calls[3][0]).toBeFalsy(); // react
    expect(spy.mock.calls[4][0]).toBeFalsy(); // one more react cycle? not sure - needs investigating
    expect(spy.mock.calls[5][0]).toBeTruthy(); // react
  });
});
