import React from 'react';
import { storiesOf } from '@storybook/react';
import { Radio } from '../src/Radio';

const stories = storiesOf('Radio', module);

stories.add('Overview', () => (
  <>
    <div>
      <Radio label="Male" name="gender1" />
      &nbsp;
      <Radio label="Female" name="gender1" />
      &nbsp;
      <Radio disabled label="None" name="gender1" />
    </div>
    <br />
    <div>
      <Radio color="primary" label="Male" name="gender2" size="medium" />
      &nbsp;
      <Radio color="primary" label="Female" name="gender2" size="medium" />
      &nbsp;
      <Radio color="primary" disabled label="None" name="gender2" size="medium" />
    </div>
    <br />
    <div>
      <Radio color="secondary" label="Male" name="gender3" size="large" />
      &nbsp;
      <Radio color="secondary" label="Female" name="gender3" size="large" />
      &nbsp;
      <Radio color="secondary" disabled label="None" name="gender3" size="large" />
    </div>
  </>
));
