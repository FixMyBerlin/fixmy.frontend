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

const delay = (time = 3000) => new Promise(res => setTimeout(res, time));

const reportsCompiledInSession = [];


export const setUpMocking = () => {
  // const REPORTS_ROUTE_SEARCH_PATTERN = /^\/(?!data)(reports)/;
  const ROUTE = 'reports/';
  const REPORTS_ROUTE_SEARCH_PATTERN = `${config.apiUrl}/${ROUTE}`;

  fetchMock.get(REPORTS_ROUTE_SEARCH_PATTERN, () => {
    const DELAY = 1000;
    console.log(`Mocking GET request call to /reports using a delay of ${DELAY}`);
    return delay(1000)
      .then(() => fetch('/data/reports-example.json'))
      .then(res => res.json())
      .then(reportList => reportList.concat(reportsCompiledInSession));
  });

  fetchMock.post(REPORTS_ROUTE_SEARCH_PATTERN, (url, fetchOptions) => {
    const DELAY = 3000;
    console.log(`Mocking POST request to /reports using a delay of ${DELAY}`);
    const newReportObj = JSON.parse(fetchOptions.body);

    // add random id between 1000 and 2000 to simulate assignment of entity ID in backend
    newReportObj.id = Math.random() * (2000 - 1000) + 1000;

    // add base64 prefix to photo. In production, the service answers with a normal URL
    newReportObj.photo = `data:image/jpg;base64,${newReportObj.photo}`;

    // cache object for usage in get request
    reportsCompiledInSession.push(newReportObj);
    const res = {
      body: newReportObj,
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    };
    return delay().then(() => res);
  });
};

export { setUpMocking as default };
