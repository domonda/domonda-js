import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '../src/Select';

const stories = storiesOf('Select', module);

stories.add('Overview', () => (
  <>
    <p>
      <Select>
        <option disabled selected value="">
          No label
        </option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </p>
    <p>
      <Select dense>
        <option disabled selected value="">
          Dense
        </option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </p>
    <p>
      <Select dense label="Dense with label">
        <option disabled selected value="">
          &mdash;
        </option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </p>
    <p>
      <Select label="Invoice type">
        <option value="incoming">Incoming</option>
        <option value="outgoing">Outgoing</option>
        <option value="credit-note">Credit-note</option>
      </Select>
    </p>
    <p>
      <Select label="Country" required>
        <option disabled selected value="">
          &mdash;
        </option>
        <option value="at">Austria</option>
        <option value="ba">Bosnia and Herzegovina</option>
      </Select>
    </p>
    <p>
      <Select label="Disabled" disabled>
        <option disabled selected value="">
          &mdash;
        </option>
      </Select>
    </p>
  </>
));
