/**
 *
 * Err
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Err } from '../src/Err';

const stories = storiesOf('Err', module);

stories.add('Overview', () => (
  <div style={{ height: 500 }}>
    <Err error={new Error('Oops something went wrong')} onRetry={() => {}} />
  </div>
));
