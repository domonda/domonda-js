import React from 'react';
import { storiesOf } from '@storybook/react';

import { P, Small } from '../src/Typography';
import { Svg } from '../src/Svg';
import { Flex } from '../src/Flex';

const stories = storiesOf('Svg', module);

stories.add('Overview', () => (
  <>
    <Flex container spacing="small" align="center">
      <Flex item style={{ display: 'flex' }}>
        <Svg
          size="small"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times"
          className="svg-inline--fa fa-times fa-w-11"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </Svg>
      </Flex>
      <Flex item>
        <Small inline>Small</Small>
      </Flex>
    </Flex>
    <br />
    <Flex container spacing="small" align="center">
      <Flex item style={{ display: 'flex' }}>
        <Svg
          color="danger"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="check-circle"
          className="svg-inline--fa fa-check-circle fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
          ></path>
        </Svg>
      </Flex>
      <Flex item>
        <P inline color="danger">
          Danger
        </P>
      </Flex>
    </Flex>
    <br />
    <Flex container spacing="small" align="center">
      <Flex item style={{ display: 'flex' }}>
        <Svg
          size="large"
          color="warning"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="arrow-alt-circle-down"
          className="svg-inline--fa fa-arrow-alt-circle-down fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z"
          ></path>
        </Svg>
      </Flex>
      <Flex item>
        <P inline size="large" color="warning">
          Large warning
        </P>
      </Flex>
    </Flex>
  </>
));
