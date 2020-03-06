/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
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

  it('should remove path to the value from the values', (done) => {
    interface DefaultValues {
      people: string[];
    }

    const defaultValues = { people: ['John', 'Jane'] };

    let form: DomondaForm<DefaultValues>;

    const { getByText } = render(
      <Form getForm={(f) => (form = f)} defaultValues={defaultValues}>
        <FormArrayField path="people">
          {({ items, remove }) => (
            <>
              {items &&
                items.map((_0, index) => (
                  <FormField key={index.toString()} path={`people[${index}]`}>
                    {() => null}
                  </FormField>
                ))}

              <button type="button" onClick={remove}>
                -
              </button>
            </>
          )}
        </FormArrayField>
      </Form>,
    );

    fireEvent.click(getByText('-'));

    setTimeout(() => {
      expect(form.state.values.people).toEqual(['John']);
      done();
    }, 0);
  });
});
