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
  type: string[];
  expected: string;
}

function createCase({
  props = {},
  type,
  expected,
}: Case): [Case['expected'], Case['type'], Case['props']] {
  return [expected, type, props];
}

it.each([
  // 0
  createCase({
    type: ['1234'],
    expected: '1234',
  }),
  // 1
  createCase({
    type: ['1234.', '5'],
    expected: '1234.5',
  }),
  // 2
  createCase({
    type: ['1234.', '5', '0'],
    expected: '1234.50',
  }),
  // 3
  createCase({
    type: ['1234.', '0'],
    expected: '1234.0',
  }),
  // 4
  createCase({
    type: ['1234.', '0', '1'],
    expected: '1234.01',
  }),
  // 5
  createCase({
    type: ['123456,12'],
    expected: '123456.12',
  }),
])(
  'should have "%s" when typing %p with props %o (case index %#)',
  async (expected, type, props) => {
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
      for (const part of type) {
        await userEvent.type(input, part);
      }
    });
    expect(input).toHaveAttribute('value', expected);
  },
);
