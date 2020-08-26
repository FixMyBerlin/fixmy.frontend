/**
 * Setup mock-service-worker,
 * see https://kentcdodds.com/blog/stop-mocking-fetch
 */

import { setupServer } from 'msw/node';
import handlers from './mswHandlers';

// Setup requests interception using the given handlers.
// eslint-disable-next-line import/prefer-default-export
export const mswServer = setupServer(...handlers);
