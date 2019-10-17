/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Form as DomondaForm } from '@domonda/form';
import { Form } from '../src/Form';

interface DefaultValues {
  title: string | null;
  name: string;
  surname: string;
}

const defaultValues: DefaultValues = {
  title: null,
  name: 'Denis',
  surname: 'Badurina',
};

describe('Creation', () => {
  it('should call getForm once per form instance', () => {
    const spy = jest.fn();

    const { rerender } = render(
      <Form defaultValues={defaultValues} getForm={spy}>
        <div />
      </Form>,
    );

    rerender(
      <Form defaultValues={defaultValues} getForm={spy}>
        <span />
      </Form>,
    );

    rerender(
      <Form defaultValues={defaultValues} getForm={spy}>
        <li />
      </Form>,
    );

    expect(spy).toBeCalledTimes(1);
  });

  it('should get same form in getForm and render prop', () => {
    let currForm: DomondaForm<DefaultValues>;
    const checkForm = (form: DomondaForm<DefaultValues>) => {
      if (!currForm) {
        currForm = form;
        return;
      }
      expect(currForm).toBe(form);
    };

    render(
      <Form defaultValues={defaultValues} getForm={checkForm}>
        {(form) => {
          checkForm(form);
          return <div />;
        }}
      </Form>,
    );
  });

  it('should properly instantiate form', (done) => {
    const checkForm = (form: DomondaForm<DefaultValues>) => {
      expect(form).toBeDefined();
      expect(form.state.defaultValues).toBe(defaultValues);
      expect(form.state.values).toBe(defaultValues);
      done();
    };

    render(
      <Form defaultValues={defaultValues} getForm={checkForm}>
        <div />
      </Form>,
    );
  });
});

describe('Submitting', () => {
  it('should call submit on submit event', (done) => {
    const spy = jest.fn();

    const { container } = render(
      <Form defaultValues={defaultValues} onSubmit={spy}>
        <div />
      </Form>,
    );

    container.querySelector('form')!.dispatchEvent(new Event('submit'));

    setTimeout(() => {
      expect(spy).toBeCalled();
      done();
    }, 0);
  });
});

describe('Updating', () => {
  it('should getForm only once per instance', () => {
    const spy = jest.fn();

    const Tree = (
      <Form getForm={spy}>
        <div />
      </Form>
    );

    const { rerender } = render(Tree);
    rerender(Tree);
    rerender(Tree);

    expect(spy).toBeCalledTimes(1);
  });

  it('should shallowly compare default values', (done) => {
    let form: DomondaForm<DefaultValues>;

    const { rerender } = render(
      <Form defaultValues={defaultValues} getForm={(f) => (form = f)}>
        <div />
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    const spy = jest.fn();

    form.plumb.subscribe(spy);

    rerender(
      <Form defaultValues={{ ...defaultValues }}>
        <span />
      </Form>,
    );

    expect(spy).not.toBeCalled();
    done();
  });

  it('should handle default values', () => {
    let form: DomondaForm<DefaultValues>;

    const { rerender } = render(
      <Form defaultValues={defaultValues} getForm={(f) => (form = f)}>
        <div />
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    expect(form.state.defaultValues).toBe(defaultValues);

    const spy = jest.fn();
    form.plumb.subscribe(spy);

    const nextDefaultValues = {};
    rerender(
      <Form defaultValues={nextDefaultValues}>
        <div />
      </Form>,
    );

    expect(form.state.defaultValues).toBe(nextDefaultValues);

    expect(spy).toBeCalledTimes(1);
  });

  it('should reset unchanged values on default values change', () => {
    interface DefVals {
      name: string;
      other: {
        details: {
          title: string | null;
          surname: string;
        };
      };
    }
    const defaultValues: DefVals = {
      name: 'Denis',
      other: {
        details: {
          title: null,
          surname: 'Badurina',
        },
      },
    };

    let form: DomondaForm<DefVals>;

    const { rerender } = render(
      <Form defaultValues={defaultValues} getForm={(f) => (form = f)}>
        <div />
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    expect(form.state.values).toBe(defaultValues);

    const [field] = form.makeFormField('other.details.title');
    field.setValue('Mr.');

    const nextDefaultValues: DefVals = {
      name: 'John',
      other: {
        details: {
          title: 'Not Mr.',
          surname: 'Doe',
        },
      },
    };
    rerender(
      <Form defaultValues={nextDefaultValues}>
        <div />
      </Form>,
    );

    expect(form.state.values).toEqual({
      name: 'John', // resetted because the value hasn't changed
      other: {
        details: {
          title: 'Mr.', // not resetted because the value changed
          surname: 'Doe', // resetted because the value hasn't changed
        },
      },
    });
  });

  it('should reset on default values change when enabled', () => {
    let form: DomondaForm<DefaultValues>;

    const { rerender } = render(
      <Form resetOnDefaultValuesChange defaultValues={defaultValues} getForm={(f) => (form = f)}>
        <div />
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    expect(form.state.values).toBe(defaultValues);

    const nextDefaultValues = {};
    rerender(
      <Form resetOnDefaultValuesChange defaultValues={nextDefaultValues}>
        <div />
      </Form>,
    );

    expect(form.state.values).toBe(nextDefaultValues);
  });

  it('should set changed to false on fields after reset on default values change', () => {
    let form: DomondaForm<DefaultValues>;

    const { rerender } = render(
      <Form resetOnDefaultValuesChange defaultValues={defaultValues} getForm={(f) => (form = f)}>
        <div />
      </Form>,
    );

    // @ts-ignore because form should indeed be set here
    if (!form) {
      throw new Error('form instance should be set here!');
    }

    expect(form.state.values).toBe(defaultValues);

    const spy = jest.fn();
    form.plumb.subscribe(spy);

    const path = 'name';
    const [field] = form.makeFormField(path);

    field.setValue({});

    expect(field.state.changed).toBeTruthy();
    expect(form.state.fields[path].changed).toBe(field.state.changed);

    const nextDefaultValues = { name: 'John' };
    rerender(
      <Form resetOnDefaultValuesChange defaultValues={nextDefaultValues}>
        <div />
      </Form>,
    );

    expect(spy).toBeCalledTimes(3); // init + value change + default values change
    expect(form.state.values).toEqual(nextDefaultValues); // we use equal because of field plumb transformers
    expect(field.state.changed).toBeFalsy();
    expect(form.state.fields[path].changed).toBe(field.state.changed);
  });
});

describe('Cleanup', () => {
  it('should dispose plumb on unmount', () => {
    const spy = jest.fn();

    const checkForm = (form: DomondaForm<DefaultValues>) => {
      form.plumb.subscribe({
        dispose: spy,
      });
    };

    const { rerender } = render(
      <Form defaultValues={defaultValues} getForm={checkForm}>
        <div />
      </Form>,
    );

    rerender(<div />);

    expect(spy).toBeCalled();
  });
});
