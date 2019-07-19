import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TextField } from '../src/TextField';

const stories = storiesOf('TextField', module);

stories.add('Overview', () => (
  <>
    <p>
      <TextField placeholder="No label" />
    </p>
    <p>
      <TextField dense placeholder="Dense" />
    </p>
    <p>
      <TextField dense label="Dense with label" />
    </p>
    <p>
      <TextField label="Invoice #" defaultValue="RE18K99196" />
    </p>
    <p>
      <TextField type="email" label="Business Partner E-Mail" />
    </p>
    <p>
      <TextField label="Amount" required={true} />
    </p>
  </>
));
