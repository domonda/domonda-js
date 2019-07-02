import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SuccessInline } from '../src/SuccessInline';

const stories = storiesOf('SuccessInline', module);

stories.add('Overview', () => (
  <>
    <SuccessInline message="Record successfuly stored!" onClose={() => {}} />
  </>
));
