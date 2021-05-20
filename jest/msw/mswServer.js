/**
 * Setup mock-service-worker,
 * see https://kentcdodds.com/blog/stop-mocking-fetch
 */

import { setupServer } from 'msw/node';

import handlers from './mswHandlers';

// Setup requests interception using the given handlers.
export const mswServer = setupServer(...handlers);
