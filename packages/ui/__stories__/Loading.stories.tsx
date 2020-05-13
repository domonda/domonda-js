/**
 *
 * Loading
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Loading } from '../src/Loading';

const stories = storiesOf('Loading', module);

stories.add('Overview', () => <Loading />);
