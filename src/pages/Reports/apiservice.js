import ky from 'ky';
import oneLine from 'common-tags/es/oneLine/oneLine';
import validateNewReport from './state/tests/schemaValidation/validateNewReport';

export const reportsEndpointUrl = config.apiUrl + config.reports.apiRoute || '/reports';

// copied from User\apiservice TODO: factor out, de-dupe
async function handleSubmitRequest({ method = 'POST', json = {}, token = false }, respType = 'json') {
  let response = {};
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  try {
    if (respType) {
      response = await ky(reportsEndpointUrl, { method, json, headers })[respType]();
    } else {
      await ky(reportsEndpointUrl, { method, json, headers });
    }
  } catch (e) {
    response.error = await e.response.json();
  }

  return response;
}

async function handleFetchReports({ method = 'GET', token = false }, respType = 'json') {
  let response = {};
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  try {
      response = await ky(reportsEndpointUrl, { method, headers })[respType]();
  } catch (e) {
    response.error = await e.response.json();
  }
  return response;
}

export async function apiSubmitReport(json) {
  return handleSubmitRequest({ json });
}

export async function apiFetchReports() {
  return handleFetchReports({});
}

/**
 * Takes a newReport store item and restructures it as the API expects the new entity to be formed like.
 * @param newReportObject
 * @returns marshalledNewReportObject
 */
export function marshallNewReportObjectFurSubmit(newReportObject) {
  const reportItemCopy = JSON.parse(JSON.stringify(newReportObject));

  // omit base64 prefix in photo string
  const { photo } = newReportObject;
  if (photo) {
    const BASE64_PREFIXES = ['data:image/jpg;base64,', 'data:image/jpeg;base64,'];
    if (!BASE64_PREFIXES.some(prefix => photo.includes(prefix))) {
      throw new Error(oneLine`Failed to remove base 64 prefix.
      Expected prefix to be '${BASE64_PREFIXES.join(' or ')}',
      found photo string starts with ${photo.slice(0, photo.indexOf(',') || 25)}`);
    }
    BASE64_PREFIXES.forEach((prefix) => {
      reportItemCopy.photo = photo.replace(prefix, '');
    });
  }

  // validate object
  const validationResult = validateNewReport(reportItemCopy);
  if (validationResult.errors.length) {
    console.error('Marshalled newReport object is not structured as stated in json schema');
    validationResult.errors.forEach(({property, message}) => {
      throw new Error(`Property ${property} ${message}`);
    });
  }

  return reportItemCopy;
}

/**
 * Maps report status codes to meaningful descriptions.
 * @param {string} status
 */
export function getReportStatusCaption(status) {
  const caption = {
    new: 'neue Meldung',
    verification: 'wird geprüft',
    accepted: 'wird umgesetzt',
    rejected: 'wird nicht umgesetzt',
    done: 'wurde umgesetzt'
  }[status];

  if (!caption) {
    console.error(`Failed to resolve status ${status} to a caption`);
    return status;
  }

  return caption;
}

export async function addUserToReport(reportId, userId) {
  let reportPatch = null;

  if (typeof reportId === 'undefined') {
    throw new Error('You need to pass a report id.');
  }

  try {
    reportPatch = await ky(`${config.apiUrl}/reports/${reportId}`, { method: 'PATCH', json: { user: userId } }).json();
  } catch (err) {
    throw new Error(`Can't connect reportId ${reportId} with user ${userId}`);
  }

  return reportPatch;
}
