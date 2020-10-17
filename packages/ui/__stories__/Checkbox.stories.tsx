import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '../src/Checkbox';

const stories = storiesOf('Checkbox', module);

stories.add('Overview', () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div>
        <Checkbox label="Filter incoming invoices" size="small" />
      </div>
      <br />
      <div>
        <Checkbox label="I am disabled" color="primary" disabled />
      </div>
      <br />
      <div>
        <Checkbox
          checked={checked}
          onChange={() => {
            /**/
          }}
          onClick={(event) => {
            event.preventDefault();
            setChecked(!checked);
          }}
          label="I agree with the terms and conditions"
          color="success"
        />
      </div>
      <br />
      <div>
        <Checkbox
          wrap="hover"
          label="I acknowledge that this action cannot be undone"
          color="warning"
          size="large"
        />
      </div>
      <br />
      <div>
        <Checkbox size="huge" />
      </div>
    </>
  );
});
