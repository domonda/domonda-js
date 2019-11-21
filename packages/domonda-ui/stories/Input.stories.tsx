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
      <Input
        label="With start svg"
        placeholder="Search term..."
        startSvg={
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="search"
            className="svg-inline--fa fa-search fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
            ></path>
          </svg>
        }
      />
    </div>
    <br />
    <div>
      <Input
        dense
        label="Dense with end svg"
        placeholder="Search term..."
        endSvg={
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="search"
            className="svg-inline--fa fa-search fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
            ></path>
          </svg>
        }
      />
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
