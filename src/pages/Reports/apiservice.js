import ky from 'ky';
import { setUpMocking } from './fixtures';

// mock api responses if configured
if (config.mockReportsApi) setUpMocking();

// copied from User\apiservice TODO: factor out, de-dupe
async function handleRequest(route, { method = 'POST', json = {}, token = false }, respType = 'json') {
  let response = {};
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  try {
    if (respType) {
      response = await ky(`${config.apiUrl}/${route}`, { method, json, headers })[respType]();
    } else {
      await ky(`${config.apiUrl}/${route}`, { method, json, headers });
    }
  } catch (e) {
    const error = await e.response.json();
    response.error = error;
  }

  return response;
}

export async function apiSubmitReport(json) {
  return handleRequest('reports/', { json });
}


export default {
  apiSubmitReport
};
