import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, TableBody, TableHeader, TableRow, TableCell } from '../src/Table';
import * as faker from 'faker';

const randomDataEntry = faker.helpers.userCard;

const stories = storiesOf('Table', module);

stories.add('Overview', () => (
  <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell sticky={true}>[]</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>EMail</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Website</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(200)
          .fill('')
          .map((_, rowIt) => {
            const rowData = randomDataEntry();
            return (
              <TableRow key={rowIt}>
                <TableCell sticky={true}>[]</TableCell>
                <TableCell>{rowData.name}</TableCell>
                <TableCell>{rowData.email}</TableCell>
                <TableCell>{rowData.phone}</TableCell>
                <TableCell>{rowData.website}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </>
));
