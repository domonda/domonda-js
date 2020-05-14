/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';

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
  expect(getByRole('textbox')).toHaveAttribute('value', 'John');
});

it('should sync the input on outside value updates', () => {
  const { getByRole, rerender } = render(
    <Form defaultValues={{ name: 'John' }}>
      <FormMaskedField mask={/.*/} path="name">
        {({ inputProps }) => <input {...inputProps} />}
      </FormMaskedField>
    </Form>,
  );

  rerender(
    <Form defaultValues={{ name: 'Jane' }}>
      <FormMaskedField mask={/.*/} path="name">
        {({ inputProps }) => <input {...inputProps} />}
      </FormMaskedField>
    </Form>,
  );

  expect(getByRole('textbox')).toHaveAttribute('value', 'Jane');
});

it('should apply mask on outside value updates', () => {
  const mask = '{Dr. }****';

  const { getByRole, rerender } = render(
    <Form defaultValues={{ name: 'John' }}>
      <FormMaskedField mask={mask} path="name">
        {({ inputProps }) => <input {...inputProps} />}
      </FormMaskedField>
    </Form>,
  );

  expect(getByRole('textbox')).toHaveAttribute('value', 'Dr. John');

  rerender(
    <Form defaultValues={{ name: 'Jane' }}>
      <FormMaskedField mask={mask} path="name">
        {({ inputProps }) => <input {...inputProps} />}
      </FormMaskedField>
    </Form>,
  );

  expect(getByRole('textbox')).toHaveAttribute('value', 'Dr. Jane');
});

it('should sync the input and mask on field value updates', () => {
  const mask = '{Dr. }****';

  let setter: (value: string) => void;
  const { getByRole } = render(
    <Form defaultValues={{ name: '' }}>
      <FormMaskedField mask={mask} path="name">
        {({ setValue, inputProps }) => {
          setter = setValue;
          return <input {...inputProps} />;
        }}
      </FormMaskedField>
    </Form>,
  );

  // @ts-ignore because setter should indeed be set here
  if (!setter) {
    throw new Error('setter should be set here!');
  }

  act(() => {
    setter('John');
  });

  expect(getByRole('textbox')).toHaveAttribute('value', 'Dr. John');

  act(() => {
    setter('Jane');
  });

  expect(getByRole('textbox')).toHaveAttribute('value', 'Dr. Jane');
});

it('should cast the masked value to the correct type', () => {
  let fieldValue: number | null;

  const { rerender } = render(
    <Form defaultValues={{ name: 256 }}>
      <FormMaskedField mask={Number} path="name">
        {({ value, inputProps }) => {
          fieldValue = value;
          return <input {...inputProps} />;
        }}
      </FormMaskedField>
    </Form>,
  );

  // @ts-ignore because fieldValue should indeed be set here
  if (fieldValue === undefined) {
    throw new Error('fieldValue should be set here!');
  }

  expect(fieldValue).toBe(256);

  rerender(
    <Form defaultValues={{ name: 512 }}>
      <FormMaskedField mask={Number} path="name">
        {({ value, inputProps }) => {
          fieldValue = value;
          return <input {...inputProps} />;
        }}
      </FormMaskedField>
    </Form>,
  );

  expect(fieldValue).toBe(512);
});

it('should update mask when options change', () => {
  const wrapper = makeForm({ name: 'John' });
  const { getByRole, rerender } = render(
    <FormMaskedField mask="{Dr. }****" path="name">
      {({ inputProps }) => <input {...inputProps} />}
    </FormMaskedField>,
    { wrapper },
  );

  expect(getByRole('textbox')).toHaveAttribute('value', 'Dr. John');

  rerender(
    <FormMaskedField mask="{Mr. }****" path="name">
      {({ inputProps }) => <input {...inputProps} />}
    </FormMaskedField>,
  );

  expect(getByRole('textbox')).toHaveAttribute('value', 'Mr. John');
});
