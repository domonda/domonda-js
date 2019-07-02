import { createForm } from '../src/createForm';

const defaultValues = {
  path: 'value',
};

describe('Creation', () => {
  test('should handle passed values on creation', () => {
    const config = {};
    const [form] = createForm(defaultValues, config);

    expect(form.$.value.defaultValues).toBe(defaultValues);
    expect(form.$.value.values).toBe(defaultValues);
    expect(form.values).toBe(defaultValues);
    expect(form.configRef.current).toBe(config);
  });
});

describe('Submitting', () => {
  test('should trigger onSubmit when calling submit', async (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
    });

    await form.submit();

    expect(spy).toBeCalled();
    done();
  });

  test('should send values to onSubmit', (done) => {
    const [form] = createForm(defaultValues, {
      onSubmit: (values) => {
        expect(values).toBe(defaultValues);
        done();
      },
    });

    form.submit();
  });

  test('should use new submit after configRef update', async (done) => {
    const old = jest.fn();
    const neu = jest.fn();

    const [form] = createForm(defaultValues, {
      onSubmit: neu,
    });

    form.configRef.current = { onSubmit: neu };

    await form.submit();

    expect(old).toBeCalledTimes(0);
    expect(neu).toBeCalled();

    done();
  });

  test('should not submit with invalid fields', async (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
    });

    form.$.next({
      ...form.$.value,
      fields: {
        ...form.$.value.fields,
        ['invalidField']: {
          changed: false,
          validityMessage: 'Failing!',
        },
      },
    });

    await form.submit();

    expect(spy).toBeCalledTimes(0);
    done();
  });

  describe('Error handling', () => {
    const err = new Error();

    const [form] = createForm(defaultValues, {
      onSubmit: () => {
        throw err;
      },
    });

    test('should catch onSubmit errors and put then in submitError', async (done) => {
      await form.submit();
      expect(form.state.submitError).toBe(err);
      done();
    });

    test('should reset submitError on reset', async (done) => {
      await form.submit();
      form.reset();
      expect(form.state.submitError).toBe(null);
      done();
    });
  });
});

describe('Cleanup', () => {
  test('should complete stream on destroy', () => {
    const [form, destroy] = createForm(defaultValues);

    const spy = jest.fn();

    form.$.subscribe({
      complete: spy,
    });

    destroy();

    expect(spy).toBeCalled();
  });

  test('should complete all field streams on destroy', () => {
    const [form, destroy] = createForm(defaultValues);

    const spy = jest.fn();

    const [field1] = form.makeFormField('some');
    field1.$.subscribe({ complete: spy });

    const [field2] = form.makeFormField('some.path');
    field2.$.subscribe({ complete: spy });

    const [field3] = form.makeFormField('some.other.path');
    field3.$.subscribe({ complete: spy });

    destroy();

    expect(spy).toBeCalledTimes(3);
  });
});
