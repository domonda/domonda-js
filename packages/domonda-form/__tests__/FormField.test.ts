import { createForm } from '../src/createForm';
import get from 'lodash/get';
import { skip } from 'rxjs/operators';

const path = 'some.path[1].to.0';

const defaultValues = {
  some: {
    path: [{ to: [{ value: '1st' }] }, { to: [{ value: '2nd' }] }],
  },
};

describe('Creation', () => {
  test('should create a field entry in the form', () => {
    const [form] = createForm(defaultValues);

    form.makeFormField(path);

    expect(form.state.fields[path]).toBeDefined();
  });

  test('should pick value and defaultValue at path from form state', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    expect(field.state.defaultValue).toBe(get(form.state.defaultValues, path));
    expect(field.value).toBe(get(form.values, path));
  });

  test('should not add value to form field', () => {
    const [form] = createForm(defaultValues);

    form.makeFormField(path);

    // @ts-ignore
    expect(form.state.fields[path].value).toBeUndefined();
  });

  test('should get initial state when subscribing', (done) => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    field.$.subscribe((state) => {
      expect(state).toEqual({
        defaultValue: get(form.state.defaultValues, path),
        value: get(form.values, path),
        validityMessage: null,
        changed: false,
      });
      done();
    });
  });
});

describe('Change', () => {
  test('should modify form state properly', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const next = {};
    field.setValue(next);

    expect(field.state.changed).toBe(true);
    expect(get(form.state.defaultValues, path)).toBe(field.state.defaultValue);
    expect(get(form.values, path)).toBe(next);
    expect(form.state.fields[path]).toBeDefined();
    // @ts-ignore in favor of the test
    expect(form.state.fields[path].value).toBeUndefined();
    // @ts-ignore in favor of the test
    expect(form.state.fields[path].defaultValue).toBeUndefined();
  });

  test('should create value at path if it didnt exist', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField('other.non.existant[0].path');
    expect(field.value).toBeUndefined();

    const next = {};
    field.setValue(next);

    expect(field.value).toBe(next);
  });

  test('should notify subscribers about state change', (done) => {
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

  test('should reset value to default', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const next = {};
    field.setValue(next);

    field.resetValue();

    expect(field.value).toBe(field.state.defaultValue);
  });

  test('should omit value sets when the value didnt change', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const spy = jest.fn();
    field.$.pipe(skip(1)).subscribe(spy);

    field.setValue(field.value);

    expect(spy).toBeCalledTimes(0);
  });
});

describe('Cleanup', () => {
  test('should call field complete on field stream complete', () => {
    const [form] = createForm(defaultValues);

    const [field] = form.makeFormField(path);

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    field.$.complete();
    expect(spy).toBeCalled();
  });

  test('should not complete form stream on field stream complete', () => {
    const [form] = createForm(defaultValues);

    const spy = jest.fn();
    form.$.subscribe({
      complete: spy,
    });

    const [field] = form.makeFormField(path);
    field.$.complete();

    expect(spy).toBeCalledTimes(0);
  });

  test('should complete field stream on destroy', () => {
    const [form] = createForm(defaultValues);

    const [field, destroy] = form.makeFormField(path);

    const spy = jest.fn();
    field.$.subscribe({
      complete: spy,
    });

    destroy();
    expect(spy).toBeCalled();
  });

  test('should remove field from form on destroy', () => {
    const [form] = createForm(defaultValues);

    const [, destroy] = form.makeFormField(path);

    destroy();
    expect(form.state.fields[path]).toBeUndefined();
  });
});

// TODO-db-190627 test validation
