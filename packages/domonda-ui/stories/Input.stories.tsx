import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../src/Input';
import { Button } from '../src/Button';
import { Flex } from '../src/Flex';

const stories = storiesOf('Input', module);

stories.add('Overview', () => (
  <>
    <div>
      <Input placeholder="No label" />
    </div>
    <br />
    <div>
      <Input dense placeholder="Dense" />
    </div>
    <br />
    <div>
      <Input dense label="Dense with label" />
    </div>
    <br />
    <div>
      <Input
        label="Ellipsis on long text"
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </div>
    <br />
    <div>
      <Input label="Invoice #" defaultValue="RE18K99196" />
    </div>
    <br />
    <div>
      <Input
        type="email"
        label="Business Partner E-Mail"
        placeholder="Enter a valid e-mail address"
      />
    </div>
    <br />
    <div>
      <Input label="Amount" placeholder="A value must be provided" required={true} />
    </div>
    <br />
    <div>
      <Input disabled label="Disabled" value="Cannot change" />
    </div>
    <br />
    <div>
      <Input naked label="Naked" placeholder="Type here to search..." />
    </div>
    <br />
    <div>
      <Input naked disabled label="Naked disabled" value="Cannot change" />
    </div>
    <br />
    <div>
      <Input naked required label="Naked invalid" placeholder="Your first name is required..." />
    </div>
    <br />
    <Flex container>
      <Flex item flex={1}>
        <Input placeholder="Is the normal size pixel perfect?" />
      </Flex>
      <Flex item>
        <Button>Well, you decide</Button>
      </Flex>
    </Flex>
    <br />
    <Flex container>
      <Flex item flex={1}>
        <Input dense placeholder="Is the dense variant pixel perfect?" />
      </Flex>
      <Flex item>
        <Button variant="primary" size="tiny">
          Looks like it is
        </Button>
      </Flex>
    </Flex>
  </>
));
