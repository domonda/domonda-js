import React from 'react';
import { storiesOf } from '@storybook/react';
import { Badge } from '../src/Badge';

const stories = storiesOf('Badge', module);

stories.add('Overview', () => (
  <>
    <div>
      <Badge>6</Badge>
    </div>
    <br />
    <div>
      <Badge color="danger">99+</Badge>
    </div>
    <br />
    <div>
      <Badge color="secondary">Some longer text...</Badge>
    </div>
  </>
));
