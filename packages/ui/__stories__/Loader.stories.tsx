/**
 *
 * Loader
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Loader } from '../src/Loader';

const stories = storiesOf('Loader', module);

stories.add('Overview', () => (
  <div>
    <Loader />
  </div>
));
