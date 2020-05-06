import React from 'react';
import { configure, addDecorator } from '@storybook/react';

const req = require.context('../stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator((story) => <div style={{ padding: 25 }}>{story()}</div>);

configure(loadStories, module);
