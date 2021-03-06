import { createForm } from '../src/createForm';
import { FormTag } from '../src/FormTag';
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

    // @ts-expect-error: in favor of the test
    expect(form.state.fields[path].value).toBeUndefined();
  });

  it('should not notify existing fields about new fields', () => {
    const [form] = createForm(defaultValues);

    const spies = Array(10)
      .fill(0)
      .map((_0, index) => {
        const [field] = form.makeFormField(`${path}.${index}`);
        const spy = jest.fn();
        field.plumb.subscribe(spy);
        return spy;
      });

    spies.forEach((spy) => {
      expect(spy).not.toBeCalled();
    });
  });

  it('should initialize with the correct disabled flag', () => {
    const [form] = createForm(defaultValues);

    form.plumb.next(
      {
        ...form.plumb.state,
        disabled: true,
      },
      FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
    );

    const [field] = form.makeFormField(path);
    expect(field.state.disabled).toBeTruthy();
  });

  it('should initialize with the correct readonly flag', () => {
    const [form] = createForm(defaultValues);

    form.plumb.next(
      {
        ...form.plumb.state,
        readOnly: true,
      },
      FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
    );

    const [field] = form.makeFormField(path);
    expect(field.state.readOnly).toBeTruthy();
  });

  it('should not override existing fields, if the field already is in use', () => {
    const [form] = createForm(defaultValues);

    const [field1] = form.makeFormField(path);
    field1.setValue('some-value');

    const [field2] = form.makeFormField(path);
    expect(field2.value).toBe('some-value');
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
    // @ts-expect-error: in favor of the test
    expect(form.state.fields[path].value).toBeUndefined();
    // @ts-expect-error: in favor of the test
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

  it('should perform deep equality check for state change', () => {
    const [form] = createForm({
      person: {
        identity: {
          name: 'John',
          surname: 'Doe',
        },
      },
    });

    const [field] = form.makeFormField('person');

    expect(field.state.changed).toBeFalsy();

    field.setValue({
      identity: {
        name: 'John',
        surname: 'Doe',
      },
    });

    expect(field.state.changed).toBeFalsy();
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

  it('should override existing values with incoming change', () => {
    const [form] = createForm({
      nil: null,
      zero: 0,
      emptyStr: '',
    });

    const value = {};

    const [nilField] = form.makeFormField('nil.value');
    nilField.setValue(value);
    expect(nilField.value).toBe(value);

    const [zeroField] = form.makeFormField('zero.value');
    zeroField.setValue(value);
    expect(zeroField.value).toBe(value);

    const [emptyStrField] = form.makeFormField('emptyStr.value');
    emptyStrField.setValue(value);
    expect(emptyStrField.value).toBe(value);
  });

  it('should disable all fields when form gets disabled', () => {
    const [form] = createForm(defaultValues);

    const fieldsAndSpies = Array(5)
      .fill(0)
      .map((_0, index) => {
        const [field] = form.makeFormField(path + '.' + index.toString());

        const spy = jest.fn();
        field.plumb.subscribe(spy);

        return {
          field,
          spy,
        };
      });

    form.plumb.next(
      { ...form.plumb.state, disabled: true },
      FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
    );

    fieldsAndSpies.forEach(({ field, spy }) => {
      expect(spy).toBeCalledTimes(1);
      expect(field.state.disabled).toBeTruthy();
    });
  });

  it('should make all fields readOnly when form is made readOnly', () => {
    const [form] = createForm(defaultValues);

    const fieldsAndSpies = Array(5)
      .fill(0)
      .map((_0, index) => {
        const [field] = form.makeFormField(path + '.' + index.toString());

        const spy = jest.fn();
        field.plumb.subscribe(spy);

        return {
          field,
          spy,
        };
      });

    form.plumb.next(
      { ...form.plumb.state, readOnly: true },
      FormTag.FORM_TOGGLE_DISABLE_OR_READ_ONLY,
    );

    fieldsAndSpies.forEach(({ field, spy }) => {
      expect(spy).toBeCalledTimes(1);
      expect(field.state.readOnly).toBeTruthy();
    });
  });

  it('should update and reset fields correctly when multiple paths are the same', () => {
    const [form] = createForm({
      people: [
        {
          name: 'John',
        },
      ],
    });

    const path = 'people[0].name';
    const [fieldArray] = form.makeFormField('people');
    const [field1] = form.makeFormField(path);
    const [field2] = form.makeFormField(path);

    field1.setValue('Jane');
    expect(fieldArray.value).toEqual([{ name: 'Jane' }]);
    expect(field2.value).toBe('Jane');

    form.reset();
    expect(fieldArray.value).toEqual([{ name: 'John' }]);
    expect(field1.value).toBe('John');
    expect(field2.value).toBe('John');
  });
});

describe('Transform', () => {
  it('should transform the value immediately', () => {
    const [form] = createForm({ date: '1935-01-01' });

    const [field] = form.makeFormField<Date | string>('date', {
      transformer: (date) => new Date(date as string),
    });

    expect(form.values.date).toBeInstanceOf(Date);
    expect(field.value).toBeInstanceOf(Date);
  });

  it('should transform the value before publishing it', () => {
    const [form] = createForm({ date: '1935-01-01' });

    const [field] = form.makeFormField<Date | string>('date', {
      transformer: (date) => new Date(date as string),
    });

    const spy = jest.fn((_0) => {
      // noop
    });
    field.plumb.subscribe(spy);

    field.setValue('1945-01-01');

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0].value).toBeInstanceOf(Date);
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

  it('should not remove field if its not the last one', () => {
    const [form] = createForm(defaultValues);

    const [field1, destroy] = form.makeFormField(path);
    const [field2] = form.makeFormField(path);
    field1.setValue('some-value');

    destroy();

    expect(field2.value).toBe('some-value');
    expect(form.state.fields[path]).toBeDefined();
  });
});
