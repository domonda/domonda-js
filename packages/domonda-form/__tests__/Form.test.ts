import { createForm } from '../src/createForm';

const defaultValues = {
  path: 'value',
};

describe('Creation', () => {
  it('should handle passed values on creation', () => {
    const config = {};
    const [form] = createForm(defaultValues, config);

    expect(form.$.value.defaultValues).toBe(defaultValues);
    expect(form.$.value.values).toBe(defaultValues);
    expect(form.values).toBe(defaultValues);
    expect(form.configRef.current).toBe(config);
  });
});

describe('Submitting', () => {
  it('should trigger onSubmit when calling submit', async (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
    });

    await form.submit();

    expect(spy).toBeCalled();
    done();
  });

  it('should send values to onSubmit', (done) => {
    const [form] = createForm(defaultValues, {
      onSubmit: (values) => {
        expect(values).toBe(defaultValues);
        done();
      },
    });

    form.submit();
  });

  it('should use new submit after configRef update', async (done) => {
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

  it('should not submit with invalid fields', async (done) => {
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

  it('should reset on successful submit', async (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
      resetOnSuccessfulSubmit: true,
    });

    form.$.next({ ...form.$.value, values: {} });

    await form.submit();

    expect(form.state.values).toBe(form.state.defaultValues);
    done();
  });

  it('should not reset on failed submit with reset on successful submit flag', async (done) => {
    const spy = jest.fn(() => {
      throw new Error('Oops!');
    });

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
      resetOnSuccessfulSubmit: true,
    });

    const nextValues = {} as any;
    form.$.next({ ...form.$.value, values: nextValues });

    await form.submit();

    expect(form.state.values).toBe(nextValues);
    done();
  });

  it('should reset on failed submit', async (done) => {
    const spy = jest.fn(() => {
      throw new Error('Oops!');
    });

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
      resetOnFailedSubmit: true,
    });

    form.$.next({ ...form.$.value, values: {} as any });

    await form.submit();

    expect(form.state.values).toBe(form.state.defaultValues);
    done();
  });

  it('should not reset on successful submit with reset on failed submit flag', async (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
      resetOnFailedSubmit: true,
    });

    const nextValues = {} as any;
    form.$.next({ ...form.$.value, values: nextValues });

    await form.submit();

    expect(form.state.values).toBe(nextValues);
    done();
  });

  it('should not auto-submit initially', (done) => {
    const spy = jest.fn();

    createForm(defaultValues, {
      autoSubmit: true,
      onSubmit: spy,
    });

    setTimeout(() => {
      expect(spy).toBeCalledTimes(0);
      done();
    }, 0);
  });

  it('should not auto-submit when values have not changed', (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      onSubmit: spy,
    });

    form.$.next({
      ...form.$.value,
      values: defaultValues,
    });

    setTimeout(() => {
      expect(spy).toBeCalledTimes(0);
      done();
    }, 0);
  });

  it('should auto-submit on values change', (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      autoSubmitDelay: 0,
      onSubmit: spy,
    });

    const nextValues = {};
    form.$.next({
      ...form.$.value,
      values: nextValues,
    });

    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(nextValues);
      done();
    }, 0);
  });

  it('should auto-submit after delay', (done) => {
    const spy = jest.fn();

    const delay = 10;
    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      autoSubmitDelay: delay,
      onSubmit: spy,
    });

    const nextValues = {};
    form.$.next({
      ...form.$.value,
      values: nextValues,
    });

    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(nextValues);
      done();
    }, delay + 1);
  });

  it('should not auto-submit when resetting changed form', (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      autoSubmitDelay: 0,
      onSubmit: spy,
    });

    setTimeout(() => {
      const nextValues = {};
      form.$.next({
        ...form.$.value,
        values: nextValues,
      });

      setTimeout(() => {
        form.reset();

        setTimeout(() => {
          expect(spy).toBeCalledTimes(1);
          done();
        }, 0);
      }, 0);
    }, 0);
  });

  it('should not auto-submit when changing both values and defaultValues', (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      autoSubmitDelay: 0,
      onSubmit: spy,
    });

    setTimeout(() => {
      const nextValues = {};
      form.$.next({
        ...form.$.value,
        defaultValues: nextValues,
        values: nextValues,
      });

      setTimeout(() => {
        expect(spy).toBeCalledTimes(0);
        done();
      }, 0);
    }, 0);
  });

  describe('Error handling', () => {
    const err = new Error();

    const [form] = createForm(defaultValues, {
      onSubmit: () => {
        throw err;
      },
    });

    it('should catch onSubmit errors and put then in submitError', async (done) => {
      await form.submit();
      expect(form.state.submitError).toBe(err);
      done();
    });

    it('should reset submitError on reset', async (done) => {
      await form.submit();
      form.reset();
      expect(form.state.submitError).toBe(null);
      done();
    });
  });
});

describe('Cleanup', () => {
  it('should complete stream on destroy', () => {
    const [form, destroy] = createForm(defaultValues);

    const spy = jest.fn();

    form.$.subscribe({
      complete: spy,
    });

    destroy();

    expect(spy).toBeCalled();
  });

  it('should complete all field streams on destroy', () => {
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
