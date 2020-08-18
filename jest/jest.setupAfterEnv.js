// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
/* mock-service-worker setup, see https://kentcdodds.com/blog/stop-mocking-fetch */
import { setupServer } from 'msw/node';
import handlers from './mocks/mswHandlers';

// Setup requests interception using the given handlers.
// eslint-disable-next-line import/prefer-default-export
export const server = setupServer(...handlers);

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});

// increase timeout for async tests
jest.setTimeout(30000);