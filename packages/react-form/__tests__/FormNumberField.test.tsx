/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// lib
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
    expected: '1,234',
  }),
])(
  'should have "%s" when typing %p with props %o (case index %#)',
  async (expected, type, props) => {
    const { getByRole } = render(
      <FormNumberField {...props} path="void">
        {({ inputProps }) => <input {...inputProps} />}
      </FormNumberField>,
    );
    const input = getByRole('textbox');
    for (const part of type) {
      await userEvent.type(input, part);
    }
    expect(input).toHaveAttribute('value', expected);
  },
);
