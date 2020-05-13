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
  allAtOnce,
  type,
  expected,
}: Case): [
  typeof expected,
  {
    type: typeof type;
    allAtOnce?: typeof allAtOnce;
  },
  typeof props,
] {
  return [
    expected,
    {
      type,
      ...(allAtOnce ? { allAtOnce } : undefined),
    },
    props,
  ];
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
    expected: '1234.5',
  }),
  // 3
  createCase({
    type: '1234.0',
    expected: '1234',
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
  // 6
  createCase({
    type: '-123.45',
    expected: '-123.45',
  }),
  // 7
  createCase({
    props: { signed: false },
    type: '-123,45',
    expected: '123.45',
  }),
  // 8
  createCase({
    props: { max: 1000 },
    allAtOnce: true,
    type: '123456,12',
    expected: '123.12',
  }),
  // 9
  createCase({
    type: '123456,1234',
    expected: '123456.12', // default scale is `2`
  }),
  // 10
  createCase({
    props: { padFractionalZeros: true, scale: 4 },
    type: '123,45',
    expected: '123.4500',
  }),
  // 11
  createCase({
    props: { normalizeZeros: false },
    type: '123,100',
    expected: '123.10', // default scale is `2`
  }),
  // 12
  createCase({
    props: {
      prefix: '$',
    },
    type: '12,34',
    expected: '$12.34',
  }),
  // 13
  createCase({
    props: {
      prefix: '$',
    },
    type: '  ',
    expected: '',
  }),
  // 14
  createCase({
    props: {
      suffix: '%',
    },
    type: '12,34',
    expected: '12.34%',
  }),
  // 15
  createCase({
    props: {
      suffix: '%',
    },
    type: '  ',
    expected: '',
  }),
  // 16
  createCase({
    props: {
      prefix: '$',
      suffix: '%',
      padFractionalZeros: true,
    },
    type: '  1 ',
    expected: '$1.00%',
  }),
])(
  "should have '%s' when %o with props %o (case index %#)",
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
      input.focus();
      await userEvent.type(input, type, { allAtOnce });
      input.blur(); // we blur to fully apply the mask
    });
    expect(input).toHaveAttribute('value', expected);
  },
);
