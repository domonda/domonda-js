import React from 'react';
import { storiesOf } from '@storybook/react';

import { Flex } from '../src/Flex';
import { Avatar } from '../src/Avatar';
import { Text } from '../src/Text';
import { Button } from '../src/Button';

const stories = storiesOf('Avatar', module);

stories.add('No bank connections', () => (
  <Flex container direction="column" spacing="large" align="center" maxWidth={712}>
    <Flex item>
      <Avatar>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="university"
          className="svg-inline--fa fa-university fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"
          ></path>
        </svg>
      </Avatar>
    </Flex>
    <Flex item style={{ textAlign: 'center' }}>
      <Text size="large" weight="semiBold" color="accent" gutterBottom>
        You haven’t connected any accounts yet.
      </Text>
      <Text size="medium" color="secondary">
        Urna mollis nulla torquent aenean molestie a vehicula class, quam at tincidunt dolor
        penatibus posuere facilisis, faucibus mauris amet vel vulputate venenatis tristique.
      </Text>
    </Flex>
    <Flex item container spacing="small" justify="center" align="center">
      <Flex item>
        <Button variant="primary">Connect a bank account</Button>
      </Flex>
      <Flex item>
        <Button variant="link">
          <span>Learn more about bank accounts</span>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="external-link-alt"
            className="svg-inline--fa fa-external-link-alt fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
            ></path>
          </svg>
        </Button>
      </Flex>
    </Flex>
  </Flex>
));
