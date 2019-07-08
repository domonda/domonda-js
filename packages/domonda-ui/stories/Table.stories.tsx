import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, TableBody, TableHeader, TableRow, TableCell } from '../src/Table';
import * as faker from 'faker';

const randomDataEntry = faker.helpers.userCard;

const stories = storiesOf('Table', module);

stories.add('Default', () => (
  <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell basis={48}>
            <input type="checkbox" />
          </TableCell>
          <TableCell grow={1}>Name</TableCell>
          <TableCell>EMail</TableCell>
          <TableCell basis={400}>Website</TableCell>
          <TableCell rtl>Phone</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(50)
          .fill('')
          .map((_, rowIt) => {
            const rowData = randomDataEntry();
            return (
              <TableRow key={rowIt}>
                <TableCell basis={48}>
                  <input type="checkbox" />
                </TableCell>
                <TableCell grow={1}>{rowData.name}</TableCell>
                <TableCell>{rowData.email}</TableCell>
                <TableCell basis={400}>{rowData.website}</TableCell>
                <TableCell rtl>{rowData.phone}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </>
));

stories.add('Clickable rows', () => (
  <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell basis={48}>
            <input type="checkbox" />
          </TableCell>
          <TableCell grow={1}>Name</TableCell>
          <TableCell>EMail</TableCell>
          <TableCell basis={400}>Website</TableCell>
          <TableCell rtl>Phone</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(50)
          .fill('')
          .map((_, rowIt) => {
            const rowData = randomDataEntry();
            return (
              <TableRow
                key={rowIt}
                component={({ children, ...rest }) => (
                  <a href="#" onClick={(e) => e.preventDefault()} {...rest}>
                    {children}
                  </a>
                )}
              >
                <TableCell basis={48}>
                  <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                </TableCell>
                <TableCell grow={1}>{rowData.name}</TableCell>
                <TableCell>{rowData.email}</TableCell>
                <TableCell basis={400}>{rowData.website}</TableCell>
                <TableCell rtl>{rowData.phone}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </>
));
