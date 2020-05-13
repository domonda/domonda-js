/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// lib
import { Form } from '../src/Form';
import { FormNumberField, FormNumberFieldProps } from '../src/FormNumberField';

interface Case {
  props?: Omit<FormNumberFieldProps<any>, 'path' | 'children'>;
  allAtOnce?: boolean;
  type: string;
  expected: string;
}

function createCase({
  props = {},
  allAtOnce = false,
  type,
  expected,
}: Case): [
  typeof expected,
  {
    type: typeof type;
    allAtOnce: typeof allAtOnce;
  },
  typeof props,
] {
  return [expected, { type, allAtOnce }, props];
}

it.each([
  // 0
  createCase({
    type: '1234',
    expected: '1234',
  }),
  // 1
  createCase({
    type: '1234.5',
    expected: '1234.5',
  }),
  // 2
  createCase({
    type: '1234.50',
    expected: '1234.50',
  }),
  // 3
  createCase({
    type: '1234.0',
    expected: '1234.0',
  }),
  // 4
  createCase({
    type: '1234.01',
    expected: '1234.01',
  }),
  // 5
  createCase({
    allAtOnce: true,
    type: '123456,12',
    expected: '123456.12',
  }),
])(
  'should have "%s" when typing %p with props %o (case index %#)',
  async (expected, { type, allAtOnce }, props) => {
    const { getByRole } = render(
      <FormNumberField {...props} path="void">
        {({ inputProps }) => <input {...inputProps} />}
      </FormNumberField>,
      {
        wrapper: Form as React.ComponentType,
      },
    );
    const input = getByRole('textbox');
    await act(async () => {
      await userEvent.type(input, type, { allAtOnce });
    });
    expect(input).toHaveAttribute('value', expected);
  },
);
