import React from 'react';
import { storiesOf } from '@storybook/react';
import { TextArea } from '../src/TextArea';

const stories = storiesOf('TextArea', module);

stories.add('Overview', () => (
  <>
    <div>
      <TextArea rows={3} placeholder="No label" />
    </div>
    <br />
    <div>
      <TextArea dense placeholder="Dense" />
    </div>
    <br />
    <div>
      <TextArea
        rows={3}
        label="Comment"
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </div>
    <br />
    <div>
      <TextArea rows={3} label="Note" placeholder="A note must be provided" required={true} />
    </div>
    <br />
    <div>
      <TextArea rows={3} disabled label="Disabled" value="Cannot change" />
    </div>
  </>
));
