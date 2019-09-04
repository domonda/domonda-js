import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Popover } from '../src/Popover';
import { Button } from '../src/Button';
import { Text } from '../src/Text';

const stories = storiesOf('Popover', module);

const Click: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button variant="contained" onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
        Click to open Popover
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: 32 }}>This is a popover</div>
      </Popover>
    </>
  );
};

const Hover: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Text
        inline
        component="span"
        onMouseEnter={({ currentTarget }) => setAnchorEl(currentTarget)}
        onMouseLeave={() => setAnchorEl(null)}
      >
        Hover to open Popover
      </Text>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ padding: 32 }}>This is a popover</div>
      </Popover>
    </>
  );
};

stories.add('Overview', () => (
  <>
    <p>
      <Click />
    </p>
    <p>
      <Hover />
    </p>
  </>
));
