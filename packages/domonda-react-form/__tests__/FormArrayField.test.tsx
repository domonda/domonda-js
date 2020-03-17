/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { renderHook, act as actHook } from '@testing-library/react-hooks';
import { createForm, Form as DomondaForm } from '@domonda/form';

import { Form } from '../src/Form';
import { FormContext } from '../src/FormContext';
import { FormField } from '../src/FormField';
import { useFormArrayField, UseFormArrayFieldProps, FormArrayField } from '../src/FormArrayField';

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
  it('should insert item on insert action', () => {
    const [form] = createForm({ names: [] });

    const path = 'names';
    const initialProps: UseFormArrayFieldProps = { path };

    const { result } = renderHook(useFormArrayField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    actHook(() => {
      result.current.insert(null);
    });

    expect(form.values[path]).toEqual([null]);
  });

  it('should insert item on insert action when allowing nulls', () => {
    const [form] = createForm({ names: null });

    const path = 'names';
    const initialProps: UseFormArrayFieldProps = { path };

    const { result } = renderHook(useFormArrayField, {
      initialProps,
      wrapper: ({ children }) => (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      ),
    });

    actHook(() => {
      result.current.insert(null);
    });

    expect(form.values[path]).toEqual([null]);
  });

  it('should insert item after index when provided', () => {
    interface DefaultValues {
      people: string[];
    }

    const defaultValues = { people: ['John', 'Doe', 'Jane'] };

    let form: DomondaForm<DefaultValues>;
    let insert: (value: any, afterIndex?: number) => void;

    render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues}>
        <FormArrayField path="people">
          {({ items, insert: innerInsert }) => {
            insert = innerInsert;
            return (
              <>
                {(items || []).map((_0, index) => (
                  <FormField key={index.toString()} path={`people[${index}]`}>
                    {() => null}
                  </FormField>
                ))}
              </>
            );
          }}
        </FormArrayField>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    // @ts-ignore because form should indeed be set here
    if (!insert) {
      throw new Error('insert should be set here!');
    }

    const specifiedValue = 'Bar';
    act(() => {
      insert(specifiedValue, 1); // 'Doe' is at index 1
    });

    expect(form.state.values.people).toEqual(['John', 'Doe', specifiedValue, 'Jane']);
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

    actHook(() => {
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

    actHook(() => {
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

    actHook(() => {
      result.current.remove();
    });

    expect(form.values[path]).toEqual([]);
  });

  it('should remove path to the value from the values', () => {
    interface DefaultValues {
      people: string[];
    }

    const defaultValues = { people: ['John', 'Jane'] };

    let form: DomondaForm<DefaultValues>;
    let remove: () => void;

    render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues}>
        <FormArrayField path="people">
          {({ items, remove: innerRemove }) => {
            remove = innerRemove;
            return (
              <>
                {(items || []).map((_0, index) => (
                  <FormField key={index.toString()} path={`people[${index}]`}>
                    {() => null}
                  </FormField>
                ))}
              </>
            );
          }}
        </FormArrayField>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    // @ts-ignore because form should indeed be set here
    if (!remove) {
      throw new Error('remove should be set here!');
    }

    act(() => {
      remove();
    });

    expect(form.state.values.people).toEqual(['John']);
  });

  it('should remove item at index when provided', () => {
    interface DefaultValues {
      people: string[];
    }

    const defaultValues = { people: ['John', 'Jane', 'Doe', 'Foo', 'Bar'] };

    let form: DomondaForm<DefaultValues>;
    let remove: (atIndex?: number) => void;

    render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues}>
        <FormArrayField path="people">
          {({ items, remove: innerRemove }) => {
            remove = innerRemove;
            return (
              <>
                {(items || []).map((_0, index) => (
                  <FormField key={index.toString()} path={`people[${index}]`}>
                    {() => null}
                  </FormField>
                ))}
              </>
            );
          }}
        </FormArrayField>
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    // @ts-ignore because form should indeed be set here
    if (!remove) {
      throw new Error('remove should be set here!');
    }

    act(() => {
      remove(2); // 'Doe' is at index 2
    });

    expect(form.state.values.people).toEqual(['John', 'Jane', 'Foo', 'Bar']);
  });
});
