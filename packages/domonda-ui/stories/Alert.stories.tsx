import React from 'react';
import { storiesOf } from '@storybook/react';
import { Alert } from '../src/Alert';

const stories = storiesOf('Alert', module);

stories.add('Overview', () => (
  <>
    <Alert message="Welcome to domonda" />
    <br />
    <Alert message="Record succesfully stored" color="success" onClose={() => {}} />
    <br />
    <Alert message="This action cannot be undone" color="warning" onClose={() => {}} />
    <br />
    <Alert message={new Error('Oops something went wrong')} onClose={() => {}} />
  </>
));
