import { createForm } from '../src/createForm';
import get from 'lodash/get';

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

    field.plumb.subscribe((state) => {
      expect(state.changed).toBe(true);
      expect(state.value).toBe(next);
      done();
    });

    field.setValue(next);
  });

  it('should reset on form reset', () => {
    const [form] = createForm(defaultValues);

    const path = 'path';
    const [field] = form.makeFormField(path);

    const next = {};
    field.setValue(next);

    form.reset();

    expect(field.value).toBe(field.state.defaultValue);
    expect(field.state.changed).toBeFalsy();
    expect(form.state.fields[path].changed).toBe(field.state.changed);
  });

  it('should reset on field reset', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const next = {};
    field.setValue(next);

    field.resetValue();

    expect(field.value).toBe(field.state.defaultValue);
    expect(field.state.changed).toBe(false);
    expect(form.state.fields[path].changed).toBe(field.state.changed);
  });

  it('should set changed to false after form reset on successful submit', async (done) => {
    const spy = jest.fn();

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
      resetOnSuccessfulSubmit: true,
    });

    const path = 'path';
    const [field] = form.makeFormField(path);

    field.setValue('othervalue');

    await form.submit();

    expect(field.state.changed).toBeFalsy();
    expect(form.state.fields[path].changed).toBe(field.state.changed);
    done();
  });

  it('should set changed to false after form reset on failed submit', async (done) => {
    const spy = jest.fn(() => {
      throw new Error('Oops!');
    });

    const [form] = createForm(defaultValues, {
      onSubmit: spy,
      resetOnFailedSubmit: true,
    });

    const path = 'path';
    const [field] = form.makeFormField(path);

    field.setValue('othervalue');

    await form.submit();

    expect(field.state.changed).toBeFalsy();
    expect(form.state.fields[path].changed).toBe(field.state.changed);
    done();
  });

  it('should omit value sets when the value didnt change', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const spy = jest.fn();
    field.plumb.subscribe(spy);

    field.setValue(field.value);

    expect(spy).toBeCalledTimes(0);
  });
});

describe('Validation', () => {
  function makeForm() {
    const [form] = createForm(defaultValues);
    return form;
  }

  it('should call validator immediatly', () => {
    const spy = jest.fn((_0) => null);

    makeForm().makeFormField(path, {
      immediateValidate: true,
      validate: spy,
    });

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe(valueAtPath);
  });

  it('should validate immediatly', () => {
    const validityMessage = 'Much invalid!';

    const [field] = makeForm().makeFormField(path, {
      immediateValidate: true,
      validate: () => validityMessage,
    });

    expect(field.plumb.state.validityMessage).toBe(validityMessage);
  });

  it('should call validator on value change', () => {
    const spy = jest.fn((_0) => null);

    const [field] = makeForm().makeFormField(path, {
      validate: spy,
    });

    expect(field.state.validityMessage).toBe(null);

    const newValue = {};
    field.setValue(newValue);

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe(newValue);
  });

  it('should receive value for validation', () => {
    const spy = jest.fn((_0) => null);

    const [field] = makeForm().makeFormField(path, {
      immediateValidate: true,
      validate: spy,
    });

    field.setValue(valueAtPath);

    const nextValue = { value: '3rd' };
    field.setValue(nextValue);

    field.setValue({ ...nextValue });

    field.setValue('');

    expect(spy).toBeCalledTimes(3);
    expect(spy.mock.calls[0][0]).toBe(valueAtPath);
    expect(spy.mock.calls[1][0]).toBe(nextValue);
    expect(spy.mock.calls[2][0]).toBe('');
  });

  it('should validate on value change', () => {
    const validityMessage = 'Much invalid!';

    const [field] = makeForm().makeFormField(path, {
      validate: () => validityMessage,
    });

    const spy = jest.fn();
    field.plumb.subscribe(({ validityMessage }) => {
      spy(validityMessage);
    });

    field.setValue({ value: '3rd' });

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe(validityMessage);
  });

  it('should validate with debounce', (done) => {
    const validityMessage = 'Much invalid!';

    const [field] = makeForm().makeFormField(path, {
      validateDebounce: 1,
      validate: () => validityMessage,
    });

    const spy = jest.fn();
    field.plumb.subscribe(({ validityMessage }) => {
      spy(validityMessage);
    });

    field.setValue({ value: '3rd' });

    setTimeout(() => {
      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(validityMessage);
      done();
    }, 1);
  });

  it('should validate promises', (done) => {
    const validityMessage = 'Much invalid!';

    const validator = jest.fn((_0) => Promise.resolve(validityMessage));

    const [field] = makeForm().makeFormField('separe', {
      immediateValidate: true,
      validate: validator,
    });

    expect(field.state.validityMessage).toBe(undefined);

    field.plumb.subscribe((state) => {
      expect(state.validityMessage).toBe(validityMessage);
      done();
    });
  });

  it('should handle subsequent validation requests gracefully', (done) => {
    const validityMessage = 'Much invalid!';

    const validator = jest.fn((_0) => Promise.resolve(validityMessage));

    const [field] = makeForm().makeFormField('separe', {
      validate: validator,
    });

    const spy = jest.fn();
    field.plumb.subscribe((state) => {
      spy(state.validityMessage);
    });

    const rounds = 10;

    field.plumb.subscribe((value) => {
      if (value.validityMessage === validityMessage) {
        const calledTimes = rounds + 4; // 4 because of the initial value and the 3 validation changes
        expect(spy).toBeCalledTimes(calledTimes);
        expect(spy.mock.calls[calledTimes - 3][0]).toBe(null);
        expect(spy.mock.calls[calledTimes - 2][0]).toBe(undefined);
        expect(spy.mock.calls[calledTimes - 1][0]).toBe(validityMessage);
        done();
      }
    });

    for (let i = 0; i <= rounds; i++) {
      field.setValue(i);
    }
  });
});

describe('Cleanup', () => {
  it('should call field dispose on field plumb dispose', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const spy = jest.fn();
    field.plumb.subscribe({
      dispose: spy,
    });

    field.plumb.dispose();
    expect(spy).toBeCalled();
  });

  it('should not dispose form plumb on field plumb dispose', () => {
    const [form] = createForm(defaultValues);

    const spy = jest.fn();
    form.plumb.subscribe({
      dispose: spy,
    });

    const [field] = form.makeFormField(path);
    field.plumb.dispose();

    expect(spy).toBeCalledTimes(0);
  });

  it('should dispose field plumb on destroy', () => {
    const [form] = createForm(defaultValues);

    const [field, destroy] = form.makeFormField(path);

    const spy = jest.fn();
    field.plumb.subscribe({
      dispose: spy,
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
