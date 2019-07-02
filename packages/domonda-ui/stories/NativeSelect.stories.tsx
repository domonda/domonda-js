import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { NativeSelect } from '../src/NativeSelect';

const stories = storiesOf('NativeSelect', module);

stories.add('Overview', () => (
  <NativeSelect label="Document Type" name="doc_type" value={10}>
    <option value="" />
    <option value={10}>Ten</option>
    <option value={20}>Twenty</option>
    <option value={30}>Thirty</option>
  </NativeSelect>
));
