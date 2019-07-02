import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TextField } from '../src/TextField';

const stories = storiesOf('TextField', module);

stories.add('Overview', () => (
  <>
    <p>
      <TextField label="Document ID" defaultValue="RE18K99196" />
    </p>
    <p>
      <TextField label="Document ID" />
    </p>
    <p>
      <TextField label="Document ID" required={true} />
    </p>
    <p>
      <TextField type="email" label="Business Partner E-Mail" required={true} />
    </p>
  </>
));
