import { createForm } from '../src/createForm';
import { FormTag } from '../src/FormTag';

const defaultValues: { [key: string]: any } = {
  path: 'value',
};

describe('Creation', () => {
  it('should handle passed values on creation', () => {
    const config = {};
    const [form] = createForm(defaultValues, config);

    expect(form.state.defaultValues).toBe(defaultValues);
    expect(form.state.values).toBe(defaultValues);
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

    form.plumb.next(
      {
        ...form.state,
        fields: {
          ...form.state.fields,
          ['invalidField']: {
            changed: false,
            validityMessage: 'Failing!',
          },
        },
      },
      FormTag.CREATE_FIELD,
    );

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

    form.plumb.next({ ...form.state, values: {} }, FormTag.VALUES_CHANGE);

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
    form.plumb.next({ ...form.state, values: nextValues }, FormTag.VALUES_CHANGE);

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

    form.plumb.next(
      {
        ...form.state,
        values: {} as any,
      },
      FormTag.VALUES_CHANGE,
    );

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
    form.plumb.next({ ...form.state, values: nextValues }, FormTag.VALUES_CHANGE);

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

    expect(spy).toBeCalledTimes(0);
    done();
  });

  it('should not auto-submit when values have not changed', (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      onSubmit: spy,
    });

    form.plumb.next(
      {
        ...form.state,
        values: defaultValues,
      },
      FormTag.VALUES_CHANGE,
    );

    expect(spy).toBeCalledTimes(0);
    done();
  });

  it('should auto-submit on values change', (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      autoSubmitDelay: 0,
      onSubmit: spy,
    });

    const nextValues = {};
    form.plumb.next(
      {
        ...form.state,
        values: nextValues,
      },
      FormTag.VALUES_CHANGE,
    );

    // submit is a promise, thats why we wrap with timeout
    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(nextValues);
      done();
    }, 0);
  });

  it('should auto-submit on field value change', (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      autoSubmitDelay: 0,
      onSubmit: spy,
    });

    const [field] = form.makeFormField('path');
    field.setValue('trigger');

    // submit is a promise, thats why we wrap with timeout
    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      done();
    }, 0);
  });

  it('should auto-submit even if currently submitting', (done) => {
    const spy = jest.fn((_0) => new Promise((resolve) => setTimeout(resolve, 0)));

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      autoSubmitDelay: 0,
      onSubmit: spy,
    });

    form.plumb.next(
      {
        ...form.state,
        values: { '1': 2 },
      },
      FormTag.VALUES_CHANGE,
    );

    expect(form.state.submitting).toBeTruthy();

    form.plumb.next(
      {
        ...form.state,
        values: { '3': 4 },
      },
      FormTag.VALUES_CHANGE,
    );

    setTimeout(() => {
      expect(spy).toBeCalledTimes(2);
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
    form.plumb.next(
      {
        ...form.state,
        values: nextValues,
      },
      FormTag.VALUES_CHANGE,
    );

    // submit is a promise, thats why we wrap with timeout
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

    const nextValues = {};
    form.plumb.next(
      {
        ...form.state,
        values: nextValues,
      },
      FormTag.VALUES_CHANGE,
    );

    form.reset();

    // submit is a promise, thats why we wrap with timeout
    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      done();
    }, 0);
  });

  it('should not auto-submit when changing both values and defaultValues', (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      autoSubmit: true,
      autoSubmitDelay: 0,
      onSubmit: spy,
    });

    const nextValues = {};
    form.plumb.next(
      {
        ...form.state,
        defaultValues: nextValues,
        values: nextValues,
      },
      FormTag.VALUES_CHANGE,
    );

    // submit is a promise, thats why we wrap with timeout
    setTimeout(() => {
      expect(spy).toBeCalledTimes(0);
      done();
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
  it('should dispose plumb on destroy', () => {
    const [form, destroy] = createForm(defaultValues);

    const spy = jest.fn();

    form.plumb.subscribe({
      dispose: spy,
    });

    destroy();

    expect(spy).toBeCalled();
  });

  it('should dispose all field plumbs on destroy', () => {
    const [form, destroy] = createForm(defaultValues);

    const spy = jest.fn();

    const [field1] = form.makeFormField('some');
    field1.plumb.subscribe({ dispose: spy });

    const [field2] = form.makeFormField('some.path');
    field2.plumb.subscribe({ dispose: spy });

    const [field3] = form.makeFormField('some.other.path');
    field3.plumb.subscribe({ dispose: spy });

    destroy();

    expect(spy).toBeCalledTimes(3);
  });
});
