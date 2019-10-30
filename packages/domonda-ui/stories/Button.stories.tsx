import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../src/Button';

const stories = storiesOf('Button', module);

stories.add('Overview', () => (
  <>
    <p>
      <Button variant="primary">Primary button</Button>
    </p>
    <p>
      <Button variant="primary" disabled>
        Disabled button
      </Button>
    </p>
    <p>
      <Button variant="primary" color="danger">
        Primary danger button
      </Button>
    </p>
    <p>
      <Button variant="primary" color="warning" disabled>
        Primary warning disabled
      </Button>
    </p>
    <p>
      <Button variant="primary" size="tiny">
        Tiny button
      </Button>
    </p>
    <p>
      <Button variant="primary" size="medium">
        Medium button
      </Button>
    </p>
    <p>
      <Button variant="primary" size="large">
        Large button
      </Button>
    </p>
    <br />
    <p>
      <Button>Secondary button</Button>
    </p>
    <p>
      <Button disabled>Disabled button</Button>
    </p>
    <p>
      <Button color="danger">Secondary danger button</Button>
    </p>
    <p>
      <Button color="warning" disabled>
        Secondary warning disabled
      </Button>
    </p>
    <p>
      <Button size="tiny">Tiny button</Button>
    </p>
    <p>
      <Button size="medium">Medium button</Button>
    </p>
    <p>
      <Button size="large">Large button</Button>
    </p>
    <br />
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
  </>
));
