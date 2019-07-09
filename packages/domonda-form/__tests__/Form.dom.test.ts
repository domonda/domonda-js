/**
 * @jest-environment jsdom
 */

import { createForm } from '../src/createForm';

describe('Config', () => {
  test('should handle passed form element on creation', () => {
    const formEl = document.createElement('form');
    const [form] = createForm(
      {},
      {
        el: formEl,
      },
    );
    expect(form.configRef.current.el).toBe(formEl);
  });

  test('should update form element when changing config', () => {
    const [form] = createForm(
      {},
      {
        el: document.createElement('form'),
      },
    );

    const formEl = document.createElement('form');
    form.configRef.current = {
      el: formEl,
    };

    expect(form.configRef.current.el).toBe(formEl);
  });
});

describe('Submitting', () => {
  test('should trigger submit on passed form element', (done) => {
    const spy = jest.fn();

    const formEl = document.createElement('form');
    createForm(
      {},
      {
        el: formEl,
        onSubmit: spy,
      },
    );

    formEl.dispatchEvent(new Event('submit'));

    // since `onSubmit` is async, it will not be called immediatly.
    // it will be called in the next event loop
    setTimeout(() => {
      expect(spy).toBeCalled();
      done();
    }, 0);
  });

  test('should not trigger submit from superseded form', (done) => {
    const spy = jest.fn();

    const formEl1 = document.createElement('form');
    const formEl2 = document.createElement('form');
    const [form] = createForm(
      {},
      {
        el: formEl1,
        onSubmit: spy,
      },
    );

    form.configRef.current = {
      el: formEl2,
      onSubmit: spy,
    };

    formEl1.dispatchEvent(new Event('submit'));
    formEl2.dispatchEvent(new Event('submit'));

    // since `onSubmit` is async, it will not be called immediatly.
    // it will be called in the next event loop
    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      done();
    }, 0);
  });
});
