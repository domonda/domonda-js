import React from 'react';
import { storiesOf } from '@storybook/react';

import { Text } from '../src/Text';

const stories = storiesOf('Text', module);

stories.add('Overview', () => (
  <>
    <Text variant="headline">Article</Text>
    <Text variant="subheading" gutterBottom>
      Some subheading info
    </Text>
    <Text variant="title" gutterBottom>
      Text
    </Text>
    <Text variant="subtitle">Sizes</Text>
    <Text paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Text>
    <Text variant="subtitle">Color</Text>
    <Text paragraph>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo.
    </Text>
    <Text variant="caption">
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.
    </Text>
  </>
));
