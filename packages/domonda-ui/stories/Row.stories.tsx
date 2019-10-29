/**
 *
 * Row
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { makeRow } from '../src/Row';

const stories = storiesOf('Row', module);

const people = [
  {
    id: '1',
    name: 'John',
    surname: 'Doe',
    gender: 'Male',
  },
  {
    id: '2',
    name: 'Jane',
    surname: 'Doe',
    gender: 'Female',
  },
];

const { RowHeader, RowItem } = makeRow<typeof people[0]>({
  columns: [
    {
      width: 32,
      HeaderCell: 'ID',
      ItemCell: ({ item }) => <span>{item.id}</span>,
    },
    {
      width: 128,
      HeaderCell: 'Name',
      ItemCell: ({ item }) => <span>{item.name}</span>,
    },
    {
      width: 128,
      HeaderCell: 'Surname',
      ItemCell: ({ item }) => <span>{item.surname}</span>,
    },
    {
      width: 64,
      HeaderCell: 'Gender',
      ItemCell: ({ item }) => <span>{item.gender}</span>,
    },
  ],
});

stories.add('Overview', () => (
  <div>
    <RowHeader />
    {people.map((person) => (
      <RowItem key={person.id} item={person} />
    ))}
  </div>
));
