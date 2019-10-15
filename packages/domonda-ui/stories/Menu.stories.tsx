import React from 'react';
import { storiesOf } from '@storybook/react';

import { Menu, MenuItem } from '../src/Menu';
import { Button } from '../src/Button';

const stories = storiesOf('Menu', module);

const SimpleMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button onClick={handleClick}>Open Menu</Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClose}>News</MenuItem>
        <MenuItem onClick={handleClose}>About us</MenuItem>
        <MenuItem onClick={handleClose}>Contact</MenuItem>
      </Menu>
    </div>
  );
};

stories.add('Overview', () => <SimpleMenu />);
