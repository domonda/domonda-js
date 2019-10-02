import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, FormState, FormInputField, FormDateField, FormNumberField } from '../src';

const stories = storiesOf('Form', module);

stories.add('Basic', () => (
  <Form onSubmit={() => {}}>
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
      <FormInputField path="surame">
        {({ inputProps }) => (
          <>
            <label>Surame:</label>
            <input {...inputProps} />
          </>
        )}
      </FormInputField>
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
    <p>
      <button type="submit">Submit</button>
    </p>
    <hr style={{ marginBottom: 15 }} />
    <strong>State:</strong>
    <pre>
      <FormState selector={(state) => state}>
        {(state) => <p>{JSON.stringify(state, undefined, '  ')}</p>}
      </FormState>
    </pre>
  </Form>
));
