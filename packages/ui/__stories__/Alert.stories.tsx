import React from 'react';
import { storiesOf } from '@storybook/react';

import { Alert } from '../src/Alert';
import { Button } from '../src/Button';
import { Svg } from '../src/Svg';
import { Flex } from '../src/Flex';

const stories = storiesOf('Alert', module);

stories.add('Overview', () => (
  <>
    <Alert message="Welcome to domonda" />
    <br />
    <Alert
      message="Record succesfully stored"
      color="success"
      actions={
        <Button variant="naked" color="surface">
          Hide
        </Button>
      }
    />
    <br />
    <Alert
      message="This action cannot be undone"
      color="warning"
      actions={
        <Button variant="naked" color="surface">
          Hide
        </Button>
      }
    />
    <br />
    <Alert
      message={new Error('Oops something went wrong')}
      actions={
        <Button variant="naked" color="surface">
          Hide
        </Button>
      }
    />
    <br />
    <Alert
      flat
      color="danger"
      message={
        <Flex container spacing="tiny" align="center">
          <Flex item style={{ display: 'Flex' }}>
            <Svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="exclamation-triangle"
              className="svg-inline--fa fa-exclamation-triangle fa-w-18"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
              ></path>
            </Svg>
          </Flex>
          <Flex item>
            <div>The service will restart in 5mins</div>
          </Flex>
        </Flex>
      }
    />
  </>
));
