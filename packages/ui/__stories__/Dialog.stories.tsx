import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../src/Button';
import { Dialog } from '../src/Dialog';

const stories = storiesOf('Dialog', module);

const Overview: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: 64 }}>This is a dialog</div>
      </Dialog>
    </>
  );
};

stories.add('Overview', () => <Overview />);
