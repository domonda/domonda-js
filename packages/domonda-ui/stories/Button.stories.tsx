import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonGroup } from '../src/Button';

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
        <Button variant="text">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="user-circle"
            className="svg-inline--fa fa-user-circle fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
          >
            <path
              fill="currentColor"
              d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"
            ></path>
          </svg>
          <span>Account settings</span>
        </Button>
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
      <br />
      <div>
        <ButtonGroup>
          <Button>Edit</Button>
          <Button>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              className="svg-inline--fa fa-caret-down fa-w-10"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              ></path>
            </svg>
          </Button>
        </ButtonGroup>
      </div>
      <br />
      <div>
        <ButtonGroup style={{ width: '100%' }}>
          <Button>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="long-arrow-alt-left"
              className="svg-inline--fa fa-long-arrow-alt-left fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
              ></path>
            </svg>
          </Button>
          <Button disabled>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="long-arrow-alt-right"
              className="svg-inline--fa fa-long-arrow-alt-right fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"
              ></path>
            </svg>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  </div>
));
