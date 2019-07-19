import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '../src/Select';

const stories = storiesOf('Select', module);

stories.add('Overview', () => (
  <Select label="Team size" value={10}>
    <option value="" />
    <option value={10}>Ten</option>
    <option value={20}>Twenty</option>
    <option value={30}>Thirty</option>
  </Select>
));
