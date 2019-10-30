import React from 'react';
import { storiesOf } from '@storybook/react';

import { Text } from '../src/Text';
import { Label } from '../src/Label';

const stories = storiesOf('Text', module);

stories.add('Overview', () => (
  <>
    <Text size="large" weight="semiBold" gutterBottom>
      Article
    </Text>
    <Text size="medium" weight="medium" gutterBottom>
      Some subheading info
    </Text>
    <Text size="medium" gutterBottom>
      1st step
    </Text>
    <Text paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Text>
    <Text size="tiny" gutterBottom>
      Consectetur adipiscing elit.
    </Text>
    <Label>Some specific label</Label>
  </>
));
