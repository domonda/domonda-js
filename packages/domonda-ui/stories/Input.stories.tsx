import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../src/Input';

const stories = storiesOf('Input', module);

stories.add('Overview', () => (
  <>
    <div>
      <Input placeholder="No label" />
    </div>
    <br />
    <div>
      <Input dense placeholder="Dense" />
    </div>
    <br />
    <div>
      <Input dense label="Dense with label" />
    </div>
    <br />
    <div>
      <Input label="Invoice #" defaultValue="RE18K99196" />
    </div>
    <br />
    <div>
      <Input
        type="email"
        label="Business Partner E-Mail"
        placeholder="Enter a valid e-mail address"
      />
    </div>
    <br />
    <div>
      <Input label="Amount" placeholder="A value must be provided" required={true} />
    </div>
    <br />
    <div>
      <Input disabled label="Disabled" value="Cannot change" />
    </div>
    <br />
  </>
));
