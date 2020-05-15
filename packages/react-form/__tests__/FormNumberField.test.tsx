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
  props?: Omit<FormNumberFieldProps, 'path' | 'children'>;
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
      thousandsSeparator: ',',
    },
    type: '1000.01',
    expected: '1,000.01',
  }),
  // 13
  createCase({
    props: {
      radix: ',',
      mapToRadix: ['.'],
      thousandsSeparator: '.',
    },
    type: '1000,01',
    expected: '1.000,01',
  }),
  // 14
  createCase({
    props: {
      radix: ',',
      mapToRadix: ['.'],
      thousandsSeparator: '.',
    },
    allAtOnce: true,
    type: '12345.123',
    expected: '12.345,12',
  }),
  // 15
  createCase({
    props: {
      radix: ',',
      mapToRadix: ['.'],
      thousandsSeparator: '.',
    },
    allAtOnce: true,
    type: '54321,54',
    expected: '54.321,54',
  }),
])(
  "should have '%s' when %o with props %j (case index %#)",
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

it("should display '0' when receiving it from the form", () => {
  const { getByRole } = render(
    <FormNumberField path="zero">{({ inputProps }) => <input {...inputProps} />}</FormNumberField>,
    {
      wrapper: ({ children }) => (
        <Form defaultValues={{ zero: 0 }}>
          <>{children}</>
        </Form>
      ),
    },
  );
  expect(getByRole('textbox')).toHaveAttribute('value', '0');
});

it('should display nothing when receiving null from the form', () => {
  const { getByRole } = render(
    <FormNumberField path="nil">{({ inputProps }) => <input {...inputProps} />}</FormNumberField>,
    {
      wrapper: ({ children }) => (
        <Form defaultValues={{ nil: null }}>
          <>{children}</>
        </Form>
      ),
    },
  );
  expect(getByRole('textbox')).toHaveAttribute('value', '');
});

it('should change input value when form sets it to the zero value or null', () => {
  const { getByRole, rerender } = render(
    <Form defaultValues={{ num: 0 }}>
      <FormNumberField path="num">{({ inputProps }) => <input {...inputProps} />}</FormNumberField>
    </Form>,
  );
  expect(getByRole('textbox')).toHaveAttribute('value', '0');

  rerender(
    <Form defaultValues={{ num: null }}>
      <FormNumberField path="num">{({ inputProps }) => <input {...inputProps} />}</FormNumberField>
    </Form>,
  );
  expect(getByRole('textbox')).toHaveAttribute('value', '');

  rerender(
    <Form defaultValues={{ num: 1 }}>
      <FormNumberField path="num">{({ inputProps }) => <input {...inputProps} />}</FormNumberField>
    </Form>,
  );
  expect(getByRole('textbox')).toHaveAttribute('value', '1');

  rerender(
    <Form defaultValues={{ num: 0 }}>
      <FormNumberField path="num">{({ inputProps }) => <input {...inputProps} />}</FormNumberField>
    </Form>,
  );
  expect(getByRole('textbox')).toHaveAttribute('value', '0');
});
