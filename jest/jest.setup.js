//
// jest.setup.js runs before each test file, while test.config.js runs only once
//

import { config as parseConfig } from 'dotenv';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// setup mock service worker (msw)
import { mswServer } from './msw/mswServer';

// Import MapboxGL mock
import './mocks/mapbox-gl';

// read env vars in our tests
parseConfig();

// add global hooks to use msw in test suites
beforeAll(() => {
  // enable the mocking in tests.
  mswServer.listen();
});

afterEach(() => {
  // if you need to add a handler after calling setupServer for some specific test
  // this will remove that handler for the rest of them
  // (which is important for test isolation):
  mswServer.resetHandlers();
});

afterAll(() => {
  // stop intercepting requests after tests have run
  mswServer.close();
});

// increase timeout for async tests
jest.setTimeout(30000);
