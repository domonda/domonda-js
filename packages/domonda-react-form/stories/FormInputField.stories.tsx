import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, FormState, FormInputField, FormDateField } from '../src';

const stories = storiesOf('FormInputField', module);

stories.add('Basic', () => (
  <Form onSubmit={() => {}}>
    <strong>State:</strong>
    <pre>
      <FormState selector={(state) => state}>
        {(state) => <p>{JSON.stringify(state, undefined, '  ')}</p>}
      </FormState>
    </pre>
    <hr />
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
    <FormDateField path="birthday">{({ DateInput }) => <DateInput />}</FormDateField>
    <p>
      <button type="submit">Submit</button>
    </p>
  </Form>
));
