import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '../src/Select';

const stories = storiesOf('Select', module);

stories.add('Overview', () => (
  <>
    <div style={{ margin: '1em 0' }}>
      <Select>
        <option disabled value="">
          No label
        </option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </div>
    <div style={{ margin: '1em 0' }}>
      <Select dense>
        <option disabled value="">
          Dense
        </option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </div>
    <div style={{ margin: '1em 0' }}>
      <Select dense label="Dense with label">
        <option disabled value="">
          &mdash;
        </option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </div>
    <div style={{ margin: '1em 0' }}>
      <Select label="Invoice type">
        <option value="incoming">Incoming</option>
        <option value="outgoing">Outgoing</option>
        <option value="credit-note">Credit-note</option>
      </Select>
    </div>
    <div style={{ margin: '1em 0' }}>
      <Select label="Country" required>
        <option disabled value="">
          &mdash;
        </option>
        <option value="at">Austria</option>
        <option value="ba">Bosnia and Herzegovina</option>
      </Select>
    </div>
    <div style={{ margin: '1em 0' }}>
      <Select label="Disabled" disabled>
        <option disabled value="">
          &mdash;
        </option>
      </Select>
    </div>
    <div style={{ margin: '1em 0' }}>
      <Select label="Read only" readOnly value="Read only value">
        <option disabled value="">
          &mdash;
        </option>
        <option disabled value="Read only value">
          &mdash;
        </option>
      </Select>
    </div>
  </>
));
