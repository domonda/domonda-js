import React from 'react';
import { storiesOf } from '@storybook/react';

import { Menu, MenuItem } from '../src/Menu';

const stories = storiesOf('Menu', module);

stories.add('Overview', () => (
  <Menu>
    <MenuItem onClick={() => {}}>News</MenuItem>
    <MenuItem onClick={() => {}}>About us</MenuItem>
    <MenuItem onClick={() => {}}>Contact</MenuItem>
  </Menu>
));
