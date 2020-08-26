// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// increase timeout for async tests
jest.setTimeout(30000);

// add global hooks to use msw in test suites

import { mswServer } from './msw/mswServer';
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

// re-export msw server to add test-specific handlers for specific tests ("co-location")
export { mswServer };
