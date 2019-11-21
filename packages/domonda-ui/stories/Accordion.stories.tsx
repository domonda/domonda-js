import React from 'react';
import { storiesOf } from '@storybook/react';

import { Accordion } from '../src/Accordion';
import { Flex } from '../src/Flex';
import { Svg } from '../src/Svg';
import { Text } from '../src/Text';
import { ButtonGroup, Button } from '../src/Button';
import { Input } from '../src/Input';
import { Checkbox } from '../src/Checkbox';

const stories = storiesOf('Accordion', module);

stories.add('Overview', () => (
  <div style={{ backgroundColor: 'white', maxWidth: 312 }}>
    <Accordion
      initiallyOpen
      label={
        <Flex container spacing="tiny" align="center">
          <Flex item>
            <Svg color="secondary">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="building"
                className="svg-inline--fa fa-building fa-w-14"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"
                ></path>
              </svg>
            </Svg>
          </Flex>
          <Flex item>
            <Text inline color="secondary">
              Client/Supplier
            </Text>
          </Flex>
        </Flex>
      }
    >
      <Flex container direction="column" spacing="tiny">
        <Flex item>
          <ButtonGroup style={{ width: '100%' }}>
            <Button color="accent" variant="primary" size="tiny">
              Include
            </Button>
            <Button color="gray40" size="tiny" variant="secondary">
              Exclude
            </Button>
          </ButtonGroup>
        </Flex>
        <Flex item>
          <Input
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
        </Flex>
        <Flex item>
          <Checkbox label="Amazon EU" />
        </Flex>
        <Flex item>
          <Checkbox label="domonda GmbH" defaultChecked />
        </Flex>
        <Flex item>
          <Checkbox label="libraconsult GmbH" />
        </Flex>
        <Flex item>
          <Checkbox label="Billa Aktiengesellschaft" />
        </Flex>
        <Flex item>
          <ButtonGroup style={{ width: '100%' }}>
            <Button size="tiny" disabled>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="long-arrow-alt-left"
                className="svg-inline--fa fa-long-arrow-alt-left fa-w-14"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M107.515 150.971L8.485 250c-4.686 4.686-4.686 12.284 0 16.971L107.515 366c7.56 7.56 20.485 2.206 20.485-8.485v-71.03h308c6.627 0 12-5.373 12-12v-32c0-6.627-5.373-12-12-12H128v-71.03c0-10.69-12.926-16.044-20.485-8.484z"
                ></path>
              </svg>
            </Button>
            <Button size="tiny">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="long-arrow-alt-right"
                className="svg-inline--fa fa-long-arrow-alt-right fa-w-14"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M340.485 366l99.03-99.029c4.686-4.686 4.686-12.284 0-16.971l-99.03-99.029c-7.56-7.56-20.485-2.206-20.485 8.485v71.03H12c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h308v71.03c0 10.689 12.926 16.043 20.485 8.484z"
                ></path>
              </svg>
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Accordion>
  </div>
));
