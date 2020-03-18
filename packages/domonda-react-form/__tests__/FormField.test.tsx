/**
 * @jest-environment jsdom
 *
 * NOTE: we wrap some `expects` in a `setTimeout` because we want the current
 * event loop to finish (react render in this case) before checking the value
 *
 */

import React from 'react';
import { FormContext } from '../src/FormContext';
import { Form } from '../src/Form';
import { useFormField, UseFormFieldProps, FormField } from '../src/FormField';
import { changedSelector } from '../src/FormState/selectors';
import { FormInputField } from '../src/FormInputField';
import { createForm, Form as DomondaForm, FormTag } from '@domonda/form';
import get from 'lodash/get';

// t
import { render, act } from '@testing-library/react';
import { renderHook, act as actHook } from '@testing-library/react-hooks';

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

    expect(form.plumb.state.fields[path]).toBeDefined();
    expect(field.value).toBe(denis.name);
    expect(field.state.value).toBe(field.value);
    expect(field.state.defaultValue).toBe(denis.name);
    expect(field.state.changed).toBe(false);
    expect(field.state.validityMessage).toBe(null);
    expect(field.state.disabled).toBeFalsy();
    expect(field.state.readOnly).toBeFalsy();
  });

  it('should initialize with the correct disabled flag', () => {
    const spy = jest.fn((_0) => null);

    let form: DomondaForm<DefaultValues>;
    render(
      <Form disabled defaultValues={defaultValues} getForm={(f) => (form = f)}>
        <FormField path={pathToDenis}>{spy}</FormField>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0].state.disabled).toBeTruthy();
  });

  it('should initialize with the correct readOnly flag', () => {
    const spy = jest.fn((_0) => null);

    let form: DomondaForm<DefaultValues>;
    render(
      <Form readOnly defaultValues={defaultValues} getForm={(f) => (form = f)}>
        <FormField path={pathToDenis}>{spy}</FormField>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0].state.readOnly).toBeTruthy();
  });
});

describe('Update', () => {
  it('should properly handle field path change', () => {
    const [form] = createForm(defaultValues);

    const denisNamePath = pathToDenis + '.name';
    const erikNamePath = pathToErik + '.name';
    const initialProps: UseFormFieldProps<string> = { path: denisNamePath };

    const { result, rerender } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    expect(result.current.value).toBe(denis.name);

    actHook(() => rerender({ path: erikNamePath }));

    expect(result.current.value).toBe(erik.name);

    expect(form.plumb.state.fields[denisNamePath]).toBeUndefined();
    expect(form.plumb.state.fields[erikNamePath]).toBeDefined();
  });

  it('should get new value if changed on form', () => {
    const [form] = createForm(defaultValues);

    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const nextValue = 'New denis';

    actHook(() => {
      form.plumb.next(
        {
          ...form.plumb.state,
          values: {
            person: {
              '1f!rst': [{ name: nextValue }],
            },
          },
        },
        FormTag.VALUES_CHANGE,
      );
    });

    expect(result.current.value).toBe(nextValue);
  });

  it('should properly handle value update', () => {
    const [form] = createForm(defaultValues);

    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const nextValue = 'New denis';
    actHook(() => {
      result.current.setValue(nextValue);
    });

    expect(get(form.state.defaultValues, path)).toBe(denis.name);
    expect(get(form.values, path)).toBe(nextValue);
  });

  it('should reset to default value on reset call', () => {
    const [form] = createForm(defaultValues);

    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const nextValue = 'New denis';

    actHook(() => {
      result.current.setValue(nextValue);
    });

    expect(result.current.value).toBe(nextValue);

    actHook(() => {
      result.current.resetValue();
    });

    expect(result.current.state.defaultValue).toBe(result.current.value);
  });

  it('should call subscribers only when value changes', () => {
    const [form] = createForm(defaultValues);

    const path = pathToDenis + '.name';
    const initialProps: UseFormFieldProps<string> = { path };

    const { result, rerender } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    const spy = jest.fn();
    result.current.plumb.subscribe(spy);

    const nextValue = 'New denis';

    actHook(() => {
      result.current.setValue(nextValue);
    });

    actHook(() => {
      rerender(initialProps);
    });

    actHook(() => {
      result.current.setValue(nextValue);
    });

    expect(spy).toBeCalledTimes(1);
  });

  it('should handle arrays when resetting values on default values change', (done) => {
    interface DV {
      people: {
        id: string;
        name: string;
      }[];
    }

    const dv: DV = {
      people: [
        {
          id: '962c7383',
          name: 'Denis',
        },
        {
          id: 'a9091de3',
          name: 'Foo',
        },
        {
          id: '0f83e892',
          name: 'Bar',
        },
      ],
    };

    let form: DomondaForm<DV>;
    const { rerender } = render(
      <Form getForm={(f) => (form = f)} resetOnDefaultValuesChange defaultValues={dv}>
        {dv.people.map((person, index) => (
          <FormField key={person.id} path={`people[${index}].id`}>
            {() => null}
          </FormField>
        ))}
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    expect(Object.keys(form.state.fields).length).toBe(dv.people.length);

    const nextDv: DV = {
      people: [
        {
          id: 'a9091de3',
          name: 'Foo',
        },
        {
          id: 'd1b7a4e8',
          name: 'John',
        },
        {
          id: '962c7383',
          name: 'Denis',
        },
        {
          id: '26dc0551',
          name: 'Jane',
        },
      ],
    };

    rerender(
      <Form resetOnDefaultValuesChange defaultValues={nextDv}>
        {nextDv.people.map((person, index) => (
          <FormField key={person.id} path={`people[${index}].id`}>
            {() => null}
          </FormField>
        ))}
      </Form>,
    );

    setTimeout(() => {
      expect(Object.keys(form.state.fields).length).toBe(nextDv.people.length);
      done();
    }, 0);
  });

  it('should not render or set undefined values on array fields', (done) => {
    interface DV {
      people: string[];
    }

    const dv: DV = {
      people: ['John', 'Foo', 'Bar'],
    };

    let form: DomondaForm<DV>;
    const { rerender } = render(
      <Form getForm={(f) => (form = f)} resetOnDefaultValuesChange defaultValues={dv}>
        <FormField<any[]> path="people">
          {({ value }) => (
            <>
              {value.map((person: any, index) => (
                <FormField key={person} path={`people[${index}]`}>
                  {() => null}
                </FormField>
              ))}
            </>
          )}
        </FormField>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    const nextDv: DV = {
      people: ['Foo'],
    };

    rerender(
      <Form resetOnDefaultValuesChange defaultValues={nextDv}>
        <FormField<any[]> path="people">
          {({ value }) => (
            <>
              {value.map((person: any, index) => (
                <FormField key={person} path={`people[${index}]`}>
                  {() => null}
                </FormField>
              ))}
            </>
          )}
        </FormField>
      </Form>,
    );

    expect(form.state.values).toEqual(nextDv);
    done();
  });

  it('should stay unchanged when added array value maches receiving default array value', () => {
    interface DefaultValues {
      people: (string | null)[];
    }

    let form: DomondaForm<DefaultValues>, add: () => void;

    const defaultValues: DefaultValues = { people: ['John'] };

    const { rerender } = render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues}>
        <FormField<DefaultValues['people']> path="people">
          {({ value, setValue }) => {
            add = () => setValue([...value, null]);
            return (
              <>
                {value.map((_0, index) => (
                  <FormField key={index.toString()} path={`people[${index}]`}>
                    {() => null}
                  </FormField>
                ))}
              </>
            );
          }}
        </FormField>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }
    // @ts-ignore because add should indeed be set here
    if (!add) {
      throw new Error('add instance should be set here!');
    }

    act(() => {
      add();
    });

    expect(form.values.people).toEqual(['John', null]);
    expect(changedSelector(form.state)).toBeTruthy();

    const nextDefaultValues: DefaultValues = {
      people: ['John', null],
    };
    rerender(
      <Form defaultValues={nextDefaultValues}>
        <FormField<DefaultValues['people']> path="people">
          {({ value, setValue }) => {
            add = () => setValue([...value, null]);
            return (
              <>
                {value.map((_0, index) => (
                  <FormField key={index.toString()} path={`people[${index}]`}>
                    {() => null}
                  </FormField>
                ))}
              </>
            );
          }}
        </FormField>
      </Form>,
    );
    expect(form.values).toEqual(nextDefaultValues);
    expect(changedSelector(form.state)).toBeFalsy();
  });

  it('should get notified about disabled state changes', () => {
    const [form] = createForm(defaultValues);

    const initialProps: UseFormFieldProps<string> = { path: pathToDenis };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    expect(result.current.state.disabled).toBeFalsy();

    actHook(() => {
      form.plumb.next(
        {
          ...form.state,
          disabled: true,
        },
        FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
      );
    });

    expect(result.current.state.disabled).toBeTruthy();

    actHook(() => {
      form.plumb.next(
        {
          ...form.state,
          disabled: false,
        },
        FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
      );
    });

    expect(result.current.state.disabled).toBeFalsy();
  });

  it('should get notified about readOnly state changes', () => {
    const [form] = createForm(defaultValues);

    const initialProps: UseFormFieldProps<string> = { path: pathToDenis };

    const { result } = renderHook(useFormField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    expect(result.current.state.readOnly).toBeFalsy();

    actHook(() => {
      form.plumb.next(
        {
          ...form.state,
          readOnly: true,
        },
        FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
      );
    });

    expect(result.current.state.readOnly).toBeTruthy();

    actHook(() => {
      form.plumb.next(
        {
          ...form.state,
          readOnly: false,
        },
        FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
      );
    });

    expect(result.current.state.readOnly).toBeFalsy();
  });

  it('should correctly manipulate nested array fields', () => {
    interface DefaultValues {
      people: string[];
    }

    const defaultValues = { people: ['John', 'Jane'] };

    let form: DomondaForm<DefaultValues>;
    let add: () => void;
    let remove: () => void;

    render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues}>
        <FormField<(string | null)[]> path="people">
          {({ value, setValue }) => {
            add = () => setValue([...value, null]);
            remove = () => setValue(value.slice(0, -1));
            return (
              <>
                {value.map((_0, index) => (
                  <FormInputField key={index.toString()} path={`people[${index}]`}>
                    {({ inputProps }) => <input {...inputProps} />}
                  </FormInputField>
                ))}
              </>
            );
          }}
        </FormField>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    // @ts-ignore because form should indeed be set here
    if (!add) {
      throw new Error('add should be set here!');
    }

    // @ts-ignore because form should indeed be set here
    if (!remove) {
      throw new Error('remove should be set here!');
    }

    act(() => {
      remove();
    });
    expect(form.state.values.people).toEqual(['John']);

    act(() => {
      add();
    });
    expect(form.state.values.people).toEqual(['John', null]);
  });
});

describe('Cleanup', () => {
  function makeForm<T extends object>(dv: T): [DomondaForm<T>, React.FC] {
    const [form] = createForm(dv);
    return [
      form,
      ({ children }) => <FormContext.Provider value={form}>{children}</FormContext.Provider>,
    ];
  }

  it('should dispose field plumb on unmount', () => {
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
    field.plumb.subscribe({
      dispose: spy,
    });

    unmount();

    expect(spy).toBeCalled();
  });

  it('should dispose previous field on path change', () => {
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
    field.plumb.subscribe({
      dispose: spy,
    });

    actHook(() => rerender({ path: pathToErik + '.name' }));

    expect(spy).toBeCalled();
  });

  it('should dispose previous field on validation update', () => {
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
    field.plumb.subscribe({
      dispose: spy,
    });

    actHook(() => rerender({ path, validate: () => null }));

    expect(spy).toBeCalled();
  });
});
