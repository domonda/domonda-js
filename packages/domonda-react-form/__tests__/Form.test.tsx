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
  it('should properly instantiate form', () => {
    const checkForm = (form: RxForm<DefaultValues>) => {
      expect(form).toBeDefined();
      expect(form.state.defaultValues).toBe(defaultValues);
      expect(form.state.values).toBe(defaultValues);
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
