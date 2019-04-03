/* eslint-disable prefer-destructuring */
import ky from 'ky';
import validateNewReport from './test/schemaValidation/validateNewReport';
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
      throw new Error(`Failed to remove base 64 prefix "data:image/jpg;base64,". ${ e}`);
    }
    obj.photo = splitResult[1]
  }


  // keep remaining data under top level node "details", talk of "bike stands" instead of ironings
  obj.details = {};
  obj.details.subject = 'BIKE_STANDS';
  obj.details.number = newReportObject.what.ironings.ironingsNeeded;
  obj.details.placement = newReportObject.what.ironings.ironingsPlacement;
  obj.details.fee = newReportObject.what.ironings.paymentReservesBikePark;

  // validate object
  const validationResult = validateNewReport(obj);
  if (validationResult.errors.length) {
    throw new Error(`Marshalled newReport object is not structured as stated in json schema: ${
      validationResult.errors}`);
  }

  return obj;
}
