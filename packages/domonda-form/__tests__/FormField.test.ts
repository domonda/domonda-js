import { createForm } from '../src/createForm';
import get from 'lodash/get';
import { skip, map, filter } from 'rxjs/operators';

const path = 'some.path[1].to.0';
const valueAtPath = { value: '2nd' };

const defaultValues = {
  some: {
    path: [{ to: [{ value: '1st' }] }, { to: [valueAtPath] }],
  },
};

describe('Creation', () => {
  it('should create a field entry in the form', () => {
    const [form] = createForm(defaultValues);

    form.makeFormField(path);

    expect(form.state.fields[path]).toBeDefined();
  });

  it('should pick value and defaultValue at path from form state', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    expect(field.state.defaultValue).toBe(valueAtPath);
    expect(field.value).toBe(get(form.values, path));
  });

  it('should not add value to form field', () => {
    const [form] = createForm(defaultValues);

    form.makeFormField(path);

    // @ts-ignore
    expect(form.state.fields[path].value).toBeUndefined();
  });

  it('should get initial state when subscribing', (done) => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    field.$.subscribe((state) => {
      expect(state).toEqual({
        defaultValue: valueAtPath,
        value: get(form.values, path),
        validityMessage: null,
        changed: false,
      });
      done();
    });
  });
});

describe('Change', () => {
  it('should modify form state properly', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const next = {};
    field.setValue(next);

    expect(field.state.changed).toBe(true);
    expect(get(form.state.defaultValues, path)).toBe(field.state.defaultValue);
    expect(get(form.values, path)).toBe(next);
    // @ts-ignore in favor of the test
    expect(form.state.fields[path].value).toBeUndefined();
    // @ts-ignore in favor of the test
    expect(form.state.fields[path].defaultValue).toBeUndefined();
    expect(form.state.fields[path]).toEqual({
      changed: field.state.changed,
      validityMessage: field.state.validityMessage,
    });
  });

  it('should create value at path if it didnt exist', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField('other.non.existant[0].path');
    expect(field.value).toBeUndefined();

    const next = {};
    field.setValue(next);

    expect(field.value).toBe(next);
  });

  it('should notify subscribers about state change', (done) => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const next = {};

    field.$.pipe(skip(1)).subscribe((state) => {
      expect(state.changed).toBe(true);
      expect(state.value).toBe(next);
      done();
    });

    field.setValue(next);
  });

  it('should correctly reset from field', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const next = {};
    field.setValue(next);

    field.resetValue();

    expect(field.value).toBe(field.state.defaultValue);
    expect(field.state.changed).toBe(false);
    expect(form.state.fields[path].changed).toBe(field.state.changed);
  });

  it('should omit value sets when the value didnt change', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const spy = jest.fn();
    field.$.pipe(skip(1)).subscribe(spy);

    field.setValue(field.value);

    expect(spy).toBeCalledTimes(0);
  });
});

describe('Validation', () => {
  function makeForm() {
    const [form] = createForm(defaultValues);
    return form;
  }

  it('should call validator immediatly', (done) => {
    const spy = jest.fn((_0) => null);

    makeForm().makeFormField(path, {
      immediateValidate: true,
      validate: spy,
    });

    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(valueAtPath);
      done();
    }, 0);
  });

  it('should validate immediatly', (done) => {
    const validityMessage = 'Much invalid!';

    const [field] = makeForm().makeFormField(path, {
      immediateValidate: true,
      validate: () => validityMessage,
    });

    const spy = jest.fn();
    field.$.pipe(map(({ validityMessage }) => validityMessage)).subscribe(spy);

    setTimeout(() => {
      expect(spy).toBeCalledTimes(2);
      expect(spy.mock.calls[0][0]).toBe(null);
      expect(spy.mock.calls[1][0]).toBe(validityMessage);
      done();
    }, 0);
  });

  it('should call validator on value change', (done) => {
    const spy = jest.fn((_0) => null);

    const [field] = makeForm().makeFormField(path, {
      validate: spy,
    });

    const newValue = {};
    field.setValue(newValue);

    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(newValue);
      done();
    }, 0);
  });

  it('should receive value for validation', (done) => {
    const spy = jest.fn((_0) => null);

    const [field] = makeForm().makeFormField(path, {
      immediateValidate: true,
      validate: spy,
    });

    setTimeout(() => {
      field.setValue(valueAtPath);

      setTimeout(() => {
        const nextValue = { value: '3rd' };
        field.setValue(nextValue);

        setTimeout(() => {
          field.setValue({ ...nextValue });

          setTimeout(() => {
            field.setValue('');

            setTimeout(() => {
              expect(spy).toBeCalledTimes(3);
              expect(spy.mock.calls[0][0]).toBe(valueAtPath);
              expect(spy.mock.calls[1][0]).toBe(nextValue);
              expect(spy.mock.calls[2][0]).toBe('');
              done();
            }, 0);
          }, 0);
        }, 0);
      }, 0);
    }, 0);
  });

  it('should validate on value change', (done) => {
    const validityMessage = 'Much invalid!';

    const [field] = makeForm().makeFormField(path, {
      validate: () => validityMessage,
    });

    const spy = jest.fn();
    field.$.pipe(map(({ validityMessage }) => validityMessage)).subscribe(spy);

    setTimeout(() => {
      field.setValue({ value: '3rd' });
      setTimeout(() => {
        expect(spy).toBeCalledTimes(3);
        expect(spy.mock.calls[0][0]).toBe(null);
        expect(spy.mock.calls[1][0]).toBe(null);
        expect(spy.mock.calls[2][0]).toBe(validityMessage);
        done();
      }, 0);
    }, 0);
  });

  it('should handle subsequent validation requests gracefully', (done) => {
    const validityMessage = 'Much invalid!';

    const validator = jest.fn(async (_0) => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      return validityMessage;
    });

    const [field] = makeForm().makeFormField('separe', {
      validate: validator,
    });

    const spy = jest.fn();
    field.$.pipe(map((value) => value.validityMessage)).subscribe(spy);

    const rounds = 10;

    field.$.pipe(filter((value) => value.validityMessage === validityMessage)).subscribe(() => {
      const calledTimes = rounds + 4; // 4 because of the initial value and the 3 validation changes
      expect(spy).toBeCalledTimes(calledTimes);
      expect(spy.mock.calls[calledTimes - 3][0]).toBe(null);
      expect(spy.mock.calls[calledTimes - 2][0]).toBe(undefined);
      expect(spy.mock.calls[calledTimes - 1][0]).toBe(validityMessage);
      done();
    });

    for (let i = 0; i <= rounds; i++) {
      field.setValue(i);
    }
  });
});

describe('Cleanup', () => {
  it('should call field complete on field stream complete', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    field.$.complete();
    expect(spy).toBeCalled();
  });

  it('should not complete form stream on field stream complete', () => {
    const [form] = createForm(defaultValues);

    const spy = jest.fn();
    form.$.subscribe({
      complete: spy,
    });

    const [field] = form.makeFormField(path);
    field.$.complete();

    expect(spy).toBeCalledTimes(0);
  });

  it('should complete field stream on destroy', () => {
    const [form] = createForm(defaultValues);

    const [field, destroy] = form.makeFormField(path);

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    destroy();
    expect(spy).toBeCalled();
  });

  it('should remove field from form on destroy', () => {
    const [form] = createForm(defaultValues);

    const [, destroy] = form.makeFormField(path);

    destroy();
    expect(form.state.fields[path]).toBeUndefined();
  });
});

// TODO-db-190627 test validation
