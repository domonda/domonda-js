import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '../src/Checkbox';

const stories = storiesOf('Checkbox', module);

stories.add('Overview', () => (
  <>
    <div>
      <Checkbox label="Filter incoming invoices" size="tiny" />
    </div>
    <br />
    <div>
      <Checkbox label="I agree with the terms and conditions" color="success" />
    </div>
    <br />
    <div>
      <Checkbox
        label="I acknowledge that this action cannot be undone"
        color="warning"
        size="medium"
      />
    </div>
    <br />
    <div>
      <Checkbox size="large" />
    </div>
  </>
));
