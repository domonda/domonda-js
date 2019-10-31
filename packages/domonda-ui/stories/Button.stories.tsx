import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../src/Button';

const stories = storiesOf('Button', module);

stories.add('Overview', () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div>
      <p>
        <Button variant="primary">Primary</Button>
      </p>
      <p>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </p>
      <p>
        <Button variant="primary" color="danger">
          Primary danger
        </Button>
      </p>
      <p>
        <Button variant="primary" color="warning" disabled>
          Primary warning disabled
        </Button>
      </p>
      <p>
        <Button variant="primary" size="tiny">
          Tiny
        </Button>
      </p>
      <p>
        <Button variant="primary" size="medium">
          Medium
        </Button>
      </p>
      <p>
        <Button variant="primary" size="large">
          Large
        </Button>
      </p>
    </div>
    <div>
      <p>
        <Button>Secondary</Button>
      </p>
      <p>
        <Button disabled>Disabled</Button>
      </p>
      <p>
        <Button color="danger">Secondary danger</Button>
      </p>
      <p>
        <Button color="warning" disabled>
          Secondary warning disabled
        </Button>
      </p>
      <p>
        <Button size="tiny">Tiny</Button>
      </p>
      <p>
        <Button size="medium">Medium</Button>
      </p>
      <p>
        <Button size="large">Large</Button>
      </p>
    </div>
    <div>
      <p>
        <Button variant="text">Text button</Button>
      </p>
      <p>
        <Button variant="text" color="success">
          Success text button
        </Button>
      </p>
      <p>
        <Button variant="link">Link button</Button>
      </p>
      <p>
        <Button variant="text">
          <svg
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
          </svg>
        </Button>
      </p>
      <br />
      <div style={{ display: 'flex' }}>
        <Button>Manage</Button>
        <div style={{ width: 4 }} />
        <Button>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="trash-alt"
            className="svg-inline--fa fa-trash-alt fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
            ></path>
          </svg>
        </Button>
      </div>
      <p>
        <Button>
          <svg
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
          </svg>
          <span>Download</span>
        </Button>
      </p>
      <p>
        <Button variant="primary" size="large">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-circle-up"
            className="svg-inline--fa fa-arrow-circle-up fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"
            ></path>
          </svg>
          <span>Upload</span>
        </Button>
      </p>
    </div>
  </div>
));
