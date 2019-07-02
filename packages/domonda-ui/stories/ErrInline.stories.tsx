import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ErrInline } from '../src/ErrInline';

const stories = storiesOf('ErrInline', module);

stories.add('Overview', () => (
  <>
    <ErrInline error={new Error('Oops, something went wrong!')} onClose={() => {}} />
  </>
));
