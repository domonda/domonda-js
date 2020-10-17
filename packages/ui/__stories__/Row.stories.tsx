/**
 *
 * Row
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { makeRow } from '../src/Row';
import { Avatar } from '../src/Avatar';
import { Svg } from '../src/Svg';

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
      width: 46,
      HeaderCell: 'Type',
      ItemCell: function ItemCell() {
        return (
          <Avatar>
            <Svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user"
              className="svg-inline--fa fa-user fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
              ></path>
            </Svg>
          </Avatar>
        );
      },
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
      <RowItem
        clickable
        key={person.id}
        item={person}
        tabIndex={0}
        style={{ alignItems: 'center' }}
      />
    ))}
  </div>
));
