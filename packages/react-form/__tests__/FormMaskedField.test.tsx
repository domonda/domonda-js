/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

// lib
import { Form, FormDefaultValues } from '../src/Form';
import { FormMaskedField } from '../src/FormMaskedField';

function makeForm(defaultValues: FormDefaultValues): React.FC {
  return ({ children }) => <Form defaultValues={defaultValues}>{<>{children}</>}</Form>;
}

it('should set the default form value on the input value', () => {
  const { getByRole } = render(
    <FormMaskedField mask={/.*/} path="name">
      {({ inputProps }) => <input {...inputProps} />}
    </FormMaskedField>,
    {
      wrapper: makeForm({ name: 'John' }),
    },
  );
  const input = getByRole('textbox');
  expect(input).toHaveAttribute('value', 'John');
});
