import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  Form,
  FormState,
  FormInputField,
  FormRadioField,
  FormDateField,
  FormNumberField,
  FormArrayField,
  FormLockedState,
  FormContext,
} from '../src';

const stories = storiesOf('Form', module);

const defaultValues = {
  name: null,
  surname: null,
  gender: null,
  birthday: null,
  num: null,
  perc: null,
  alternativeNames: [],
  parents: [
    {
      name: 'John',
      surname: 'Doe',
    },
  ],
};

const Basic: React.FC = () => {
  const [state, setState] = useState(defaultValues);
  return (
    <Form
      defaultValues={state}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setState(values);
        await new Promise((resolve) => setTimeout(resolve, 0));
      }}
    >
      <p>
        <FormInputField required path="name">
          {({ inputProps }) => (
            <>
              <label>Name*:</label>
              <input {...inputProps} />
            </>
          )}
        </FormInputField>
      </p>
      <p>
        <FormInputField path="surname">
          {({ inputProps }) => (
            <>
              <label>Surame:</label>
              <input {...inputProps} />
            </>
          )}
        </FormInputField>
      </p>
      <p>
        <FormRadioField path="gender" required>
          {({ inputProps, value }) => (
            <>
              <label>Male:</label>
              <input {...inputProps} value="male" checked={value === 'male'} />
              &nbsp;
              <label>Female:</label>
              <input {...inputProps} value="female" checked={value === 'female'} />
            </>
          )}
        </FormRadioField>
      </p>
      <div>
        <FormDateField path="birthday">
          {({ DateInput }) => (
            <>
              <label>Date:</label>
              <div style={{ display: 'inline-block', width: 131 }}>
                <DateInput />
              </div>
            </>
          )}
        </FormDateField>
      </div>
      <p>
        <FormNumberField path="num" thousandsSeparatorSymbol="." decimalSymbol=",">
          {({ inputProps }) => (
            <>
              <label>Num:</label>
              <input {...inputProps} />
            </>
          )}
        </FormNumberField>
      </p>
      <p>
        <FormNumberField
          path="perc"
          thousandsSeparatorSymbol="."
          decimalSymbol=","
          suffix="%"
          allowDecimal
          isAllowed={(val) => {
            return val === null || val <= 100;
          }}
        >
          {({ inputProps }) => (
            <>
              <label>Percentage:</label>
              <input {...inputProps} />
            </>
          )}
        </FormNumberField>
      </p>
      <div>
        <label>Alternative names:</label>
        <FormArrayField path="alternativeNames">
          {({ items, add, remove }) => (
            <>
              {items &&
                items.map((_, index) => (
                  <div key={index.toString()}>
                    <FormInputField path={`alternativeNames[${index}]`}>
                      {({ inputProps }) => <input {...inputProps} />}
                    </FormInputField>
                  </div>
                ))}

              <div>
                <button type="button" onClick={remove}>
                  -
                </button>
                <button type="button" onClick={add}>
                  +
                </button>
              </div>
            </>
          )}
        </FormArrayField>
      </div>
      <p>
        <FormLockedState>
          {(locked) => (
            <span>
              Locked:&nbsp;
              <strong>{JSON.stringify(locked)}</strong>
            </span>
          )}
        </FormLockedState>
      </p>
      <p>
        <FormContext.Consumer>
          {({ reset }) => (
            <FormLockedState>
              {(locked) => (
                <span>
                  <button type="submit" disabled={locked}>
                    Submit
                  </button>
                  &nbsp;
                  <button disabled={locked} onClick={reset}>
                    Reset
                  </button>
                </span>
              )}
            </FormLockedState>
          )}
        </FormContext.Consumer>
      </p>
      <hr style={{ marginBottom: 15 }} />
      <strong>State:</strong>
      <pre>
        <FormState selector={(state) => state}>
          {(state) => <p>{JSON.stringify(state, undefined, '  ')}</p>}
        </FormState>
      </pre>
    </Form>
  );
};

stories.add('Basic', () => <Basic />);
