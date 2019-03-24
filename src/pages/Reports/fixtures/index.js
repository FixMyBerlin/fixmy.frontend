/* eslint-disable import/no-extraneous-dependencies */ // TODO: clarify if dev-dependencies are really declared as dependencies
/*

The idea here is to mock API calls since the /reports endpoint is
not fully designed or implemented yet.

Mocking is done following the approach sketched here:
https://hackernoon.com/liberate-your-ui-development-setup-a-mock-api-9b6167d06ffa

 */

import fetchMock from 'fetch-mock';

// fetch-mock configuration, see http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration
fetchMock.config.fallbackToNetwork = true;
fetchMock.config.warnOnFallback = false;

const DELAY = 3000;
const delay = () => new Promise(res => setTimeout(res, DELAY));

export const setUpMocking = () => fetchMock.post(/\/reports/, (url, fetchOptions) => {
  console.log(`Mocking api call to /reports using a delay of ${DELAY}`);
  const res = {
    body: { ...fetchOptions, id: 1 },
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  };
  return delay().then(() => res);
});

export { setUpMocking as default };
