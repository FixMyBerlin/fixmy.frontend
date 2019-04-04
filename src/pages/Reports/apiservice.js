/* eslint-disable prefer-destructuring,no-use-before-define */
import ky from 'ky';
import validateNewReport from './test/schemaValidation/validateNewReport';
import { setUpMocking } from './fixtures';

// mock api responses if configured
if (config.mockReportsApi) setUpMocking();

const ROUTE = 'reports/';

export async function apiSubmitReport(json) {
  return handleSubmitRequest({ json });
}

export async function apiFetchReports() {
  return handleFetchReports({});
}

// copied from User\apiservice TODO: factor out, de-dupe
async function handleSubmitRequest({ method = 'POST', json = {}, token = false }, respType = 'json') {
  let response = {};
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  try {
    if (respType) {
      response = await ky(`${config.apiUrl}/${ROUTE}`, { method, json, headers })[respType]();
    } else {
      await ky(`${config.apiUrl}/${ROUTE}`, { method, json, headers });
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
      response = await ky(`${config.apiUrl}/${ROUTE}`, { method, headers })[respType]();
  } catch (e) {
    response.error = await e.response.json();
  }
  return response;
}

/**
 * TODO: Refactor files and store entry props to use the corrected wording in-code so that less marshalling needs to be done.
 * Takes a newReport store item and restructures it as the API expects the new entity to be formed like.
 * @param newReportObject
 * @returns marshalledNewReportObject
 */
export function marshallNewReportObjectFurSubmit(newReportObject) {
  const obj = {};

  // pass location coordinates as array instead of object
  obj.location = {};
  obj.location.address = newReportObject.location.address;
  const coords = newReportObject.location.lngLat;
  obj.location.coordinates = [coords.lng, coords.lat];

  // keep photo and description in top level of object
  obj.description = newReportObject.what.additionalInfo.description;

  // omit base64 prefix in photo string
  const photo = newReportObject.what.additionalInfo.photo;
  if (photo) {
    const splitResult = photo.split('base64,')[1];
    if (!splitResult[1]) {
      throw new Error('Failed to remove base 64 prefix "data:image/jpg;base64,"');
    }
    obj.photo = splitResult[1];
  }


  // keep remaining data under top level node "details"
  obj.details = {};
  obj.details.subject = 'BIKE_STANDS';
  obj.details.number = newReportObject.what.bikestands.bikestandsNeeded;
  obj.details.placement = newReportObject.what.bikestands.bikestandsPlacement;
  obj.details.fee = newReportObject.what.bikestands.paymentReservesBikePark;

  // validate object
  const validationResult = validateNewReport(obj);
  if (validationResult.errors.length) {
    throw new Error(`Marshalled newReport object is not structured as stated in json schema: ${
      validationResult.errors}`);
  }

  return obj;
}
