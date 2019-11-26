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
        <Button>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="atom"
            className="svg-inline--fa fa-atom fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M413.03 256c40.13-54.89 41.51-98.62 25.14-128-10.91-19.52-40.54-50.73-116.33-41.88C300.36 34.89 267.64 0 224 0s-76.36 34.89-97.84 86.12C50.43 77.34 20.73 108.48 9.83 128c-16.38 29.4-15 73.09 25.14 128-40.13 54.89-41.51 98.62-25.14 128 29.21 52.34 101.68 43.58 116.33 41.88C147.63 477.1 180.36 512 224 512s76.37-34.9 97.84-86.12c14.64 1.7 87.11 10.46 116.33-41.88 16.38-29.4 15-73.09-25.14-128zM63.38 352c-4.03-7.21-.19-24.8 14.95-48.29 6.96 6.53 14.2 12.89 21.87 19.18 1.71 13.71 4 27.08 6.76 40.08-24.56.89-39.89-4.37-43.58-10.97zm36.82-162.88c-7.66 6.29-14.9 12.65-21.87 19.18-15.13-23.5-18.97-41.09-14.95-48.3 3.41-6.14 16.39-11.47 37.92-11.47 1.71 0 3.87.3 5.69.37a472.191 472.191 0 0 0-6.79 40.22zM224 64c9.47 0 22.2 13.52 33.86 37.26-11.19 3.7-22.44 8-33.86 12.86-11.42-4.86-22.67-9.16-33.86-12.86C201.8 77.52 214.53 64 224 64zm0 384c-9.47 0-22.2-13.52-33.86-37.26 11.19-3.7 22.44-8 33.86-12.86 11.42 4.86 22.67 9.16 33.86 12.86C246.2 434.48 233.47 448 224 448zm62.5-157.33c-26.7 19.08-46.14 29.33-62.5 37.48-16.35-8.14-35.8-18.41-62.5-37.48-1.99-27.79-1.99-41.54 0-69.33 26.67-19.05 46.13-29.32 62.5-37.48 16.39 8.17 35.86 18.44 62.5 37.48 1.98 27.78 1.99 41.53 0 69.33zM384.62 352c-3.67 6.62-19 11.82-43.58 10.95 2.76-13 5.05-26.37 6.76-40.06 7.66-6.29 14.9-12.65 21.87-19.18 15.13 23.49 18.97 41.08 14.95 48.29zm-14.95-143.71c-6.96-6.53-14.2-12.89-21.87-19.18a473.535 473.535 0 0 0-6.79-40.22c1.82-.07 3.97-.37 5.69-.37 21.52 0 34.51 5.34 37.92 11.47 4.02 7.22.18 24.81-14.95 48.3zM224 224c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32z"
            ></path>
          </svg>
          <span>Well, you decide</span>
        </Button>
      </Flex>
    </Flex>
    <br />
    <Flex container>
      <Flex item flex={1}>
        <Input dense placeholder="Is the dense variant pixel perfect?" />
      </Flex>
      <Flex item>
        <Button variant="primary" size="tiny">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="american-sign-language-interpreting"
            className="svg-inline--fa fa-american-sign-language-interpreting fa-w-20"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M290.547 189.039c-20.295-10.149-44.147-11.199-64.739-3.89 42.606 0 71.208 20.475 85.578 50.576 8.576 17.899-5.148 38.071-23.617 38.071 18.429 0 32.211 20.136 23.617 38.071-14.725 30.846-46.123 50.854-80.298 50.854-.557 0-94.471-8.615-94.471-8.615l-66.406 33.347c-9.384 4.693-19.815.379-23.895-7.781L1.86 290.747c-4.167-8.615-1.111-18.897 6.946-23.621l58.072-33.069L108 159.861c6.39-57.245 34.731-109.767 79.743-146.726 11.391-9.448 28.341-7.781 37.51 3.613 9.446 11.394 7.78 28.067-3.612 37.516-12.503 10.559-23.618 22.509-32.509 35.57 21.672-14.729 46.679-24.732 74.186-28.067 14.725-1.945 28.063 8.336 29.73 23.065 1.945 14.728-8.336 28.067-23.062 29.734-16.116 1.945-31.12 7.503-44.178 15.284 26.114-5.713 58.712-3.138 88.079 11.115 13.336 6.669 18.893 22.509 12.224 35.848-6.389 13.06-22.504 18.617-35.564 12.226zm-27.229 69.472c-6.112-12.505-18.338-20.286-32.231-20.286a35.46 35.46 0 0 0-35.565 35.57c0 21.428 17.808 35.57 35.565 35.57 13.893 0 26.119-7.781 32.231-20.286 4.446-9.449 13.614-15.006 23.339-15.284-9.725-.277-18.893-5.835-23.339-15.284zm374.821-37.237c4.168 8.615 1.111 18.897-6.946 23.621l-58.071 33.069L532 352.16c-6.39 57.245-34.731 109.767-79.743 146.726-10.932 9.112-27.799 8.144-37.51-3.613-9.446-11.394-7.78-28.067 3.613-37.516 12.503-10.559 23.617-22.509 32.508-35.57-21.672 14.729-46.679 24.732-74.186 28.067-10.021 2.506-27.552-5.643-29.73-23.065-1.945-14.728 8.336-28.067 23.062-29.734 16.116-1.946 31.12-7.503 44.178-15.284-26.114 5.713-58.712 3.138-88.079-11.115-13.336-6.669-18.893-22.509-12.224-35.848 6.389-13.061 22.505-18.619 35.565-12.227 20.295 10.149 44.147 11.199 64.739 3.89-42.606 0-71.208-20.475-85.578-50.576-8.576-17.899 5.148-38.071 23.617-38.071-18.429 0-32.211-20.136-23.617-38.071 14.033-29.396 44.039-50.887 81.966-50.854l92.803 8.615 66.406-33.347c9.408-4.704 19.828-.354 23.894 7.781l44.455 88.926zm-229.227-18.618c-13.893 0-26.119 7.781-32.231 20.286-4.446 9.449-13.614 15.006-23.339 15.284 9.725.278 18.893 5.836 23.339 15.284 6.112 12.505 18.338 20.286 32.231 20.286a35.46 35.46 0 0 0 35.565-35.57c0-21.429-17.808-35.57-35.565-35.57z"
            ></path>
          </svg>
          <span>Looks like it is</span>
        </Button>
      </Flex>
    </Flex>
  </>
));
