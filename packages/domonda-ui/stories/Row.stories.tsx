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
    title: '',
    name: 'John',
    surname: 'Doe',
    gender: 'Male',
  },
  {
    id: '2',
    title: 'Mrs.',
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
      ItemCell: ({ item }) => item.id,
    },
    {
      width: 64,
      HeaderCell: 'Title',
      ItemCell: ({ item }) => item.title,
    },
    {
      width: 128,
      HeaderCell: 'Name',
      ItemCell: ({ item }) => item.name,
    },
    {
      width: 128,
      HeaderCell: 'Surname',
      ItemCell: ({ item }) => item.surname,
    },
    {
      width: 64,
      HeaderCell: 'Gender',
      ItemCell: ({ item }) => item.gender,
    },
  ],
});

stories.add('Overview', () => (
  <div>
    <RowHeader />
    {people.map((person) => (
      <RowItem clickable key={person.id} item={person} />
    ))}
  </div>
));
