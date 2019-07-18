/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Form as RxForm } from '@domonda/form';
import { Form } from '../src/Form';
import { filter } from 'rxjs/operators';

afterEach(cleanup);

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
    let currForm: RxForm<DefaultValues>;
    const checkForm = (form: RxForm<DefaultValues>) => {
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
    const spy = jest.fn();

    const checkForm = (form: RxForm<DefaultValues>) => {
      expect(form).toBeDefined();
      form.$.subscribe(spy);
      expect(form.state.defaultValues).toBe(defaultValues);
      expect(form.state.values).toBe(defaultValues);
    };

    render(
      <Form defaultValues={defaultValues} getForm={checkForm}>
        <div />
      </Form>,
    );

    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      done();
    }, 0);
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
    let form: RxForm<DefaultValues>;

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

    form.$.subscribe(spy);

    rerender(
      <Form defaultValues={{ ...defaultValues }}>
        <span />
      </Form>,
    );

    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      done();
    }, 0);
  });

  it('should handle default values', (done) => {
    let form: RxForm<DefaultValues>;

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

    expect(form.state.defaultValues).toBe(defaultValues);
    form.$.pipe(filter((state) => state.defaultValues === defaultValues)).subscribe(spy);

    const nextDefaultValues = {};
    rerender(
      <Form defaultValues={nextDefaultValues}>
        <div />
      </Form>,
    );

    form.$.pipe(filter((state) => state.defaultValues === nextDefaultValues)).subscribe(spy);

    setTimeout(() => {
      expect(spy).toBeCalledTimes(2);
      done();
    }, 0);
  });

  it('should reset on default values change when enabled', () => {
    let form: RxForm<DefaultValues>;

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
});

describe('Cleanup', () => {
  it('should complete stream on unmount', () => {
    const spy = jest.fn();

    const checkForm = (form: RxForm<DefaultValues>) => {
      form.$.subscribe({
        complete: spy,
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
