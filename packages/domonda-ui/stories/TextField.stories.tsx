import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TextField } from '../src/TextField';

const stories = storiesOf('TextField', module);

stories.add('Overview', () => (
  <>
    <div>
      <TextField placeholder="No label" />
    </div>
    <br />
    <div>
      <TextField dense placeholder="Dense" />
    </div>
    <br />
    <div>
      <TextField dense label="Dense with label" />
    </div>
    <br />
    <div>
      <TextField label="Invoice #" defaultValue="RE18K99196" />
    </div>
    <br />
    <div>
      <TextField
        type="email"
        label="Business Partner E-Mail"
        placeholder="Enter a valid e-mail address"
      />
    </div>
    <br />
    <div>
      <TextField label="Amount" placeholder="A value must be provided" required={true} />
    </div>
    <br />
    <div>
      <TextField disabled label="Disabled" value="Cannot change" />
    </div>
    <br />
  </>
));
