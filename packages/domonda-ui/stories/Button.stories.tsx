import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../src/Button';

const stories = storiesOf('Button', module);

// TODO-db-190702 add stories for `IconButtons`

const DefaultButtons = () => (
  <>
    <p>
      <Button>Button</Button>
    </p>
    <p>
      <Button disabled>Disabled button</Button>
    </p>
    <p>
      <Button size="sm">Small button</Button>
    </p>
  </>
);

const ContainedButtons = () => (
  <>
    <p>
      <Button variant="contained">Button</Button>
    </p>
    <p>
      <Button variant="contained" color="primary">
        Primary button
      </Button>
    </p>
    <p>
      <Button variant="contained" size="sm" color="primary">
        Small primary button
      </Button>
    </p>
    <p>
      <Button variant="contained" color="secondary">
        Secondary button
      </Button>
    </p>
    <p>
      <Button variant="contained" size="sm" color="secondary">
        Small secondary button
      </Button>
    </p>
    <p>
      <Button variant="contained" color="danger">
        Danger button
      </Button>
    </p>
  </>
);

const OutlinedButtons = () => (
  <>
    <p>
      <Button variant="outlined">Button</Button>
    </p>
    <p>
      <Button variant="outlined" disabled>
        Disabled button
      </Button>
    </p>
    <p>
      <Button variant="outlined" color="primary">
        Primary button
      </Button>
    </p>
    <p>
      <Button variant="outlined" size="sm" color="primary">
        Small primary button
      </Button>
    </p>
    <p>
      <Button variant="outlined" color="secondary">
        Button with color secondary
      </Button>
    </p>
    <p>
      <Button variant="outlined" size="sm" color="secondary">
        Small secondary button
      </Button>
    </p>
    <p>
      <Button variant="outlined" color="danger">
        Danger button
      </Button>
    </p>
  </>
);

stories.add('Overview', () => (
  <>
    <DefaultButtons />
    <ContainedButtons />
    <OutlinedButtons />
  </>
));
stories.add('Outlined', () => <OutlinedButtons />);
stories.add('Contained', () => <ContainedButtons />);
