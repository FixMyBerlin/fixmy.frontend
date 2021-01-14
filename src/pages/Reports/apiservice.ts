import ky from 'ky-universal';
import oneLine from 'common-tags/es/oneLine/oneLine';
import type { Point } from 'geojson';
import validateNewReport from './state/tests/schemaValidation/validateNewReport';
import logger from '~/utils/logger';
import config from '~/pages/Reports/config';

export const reportsEndpointUrl =
  config.apiUrl + config.reports.apiRoute || '/reports';

// camelcase allowed because this comes from Python world
// eslint-disable camelcase

type BikeStandsDetails = {
  subject: 'BIKE_STANDS';
  number: number;
  fee_acceptable: boolean;
};

export type NewReport = {
  address: string;
  description?: string;
  details: BikeStandsDetails[];
  geometry: Point;
  photo?: string;
};

type Photo = {
  copyright: string;
  src: string;
};

type ReportID = number;
type UserID = number;
export type Report = NewReport & {
  created_date: string;
  id: ReportID;
  liked_by_user: boolean;
  likes: number;
  modified_date: string;
  origin: Omit<Report, 'plannings' | 'origin'>[];
  photo: Photo;
  plannings: Omit<Report, 'plannings' | 'origin'>[];
  status_reason: string;
  status: Status;
  url: string;
  user: UserID | null;
};

export type Status =
  | 'report_new'
  | 'report_verification'
  | 'report_accepted'
  | 'report_rejected'
  | 'report_inactive'
  | 'new'
  | 'verification'
  | 'accepted'
  | 'rejected'
  | 'inactive'
  | 'planning'
  | 'tender'
  | 'execution'
  | 'invalid'
  | 'done';

type SubmitReportResponse = any;

// eslint-enable camelcase

// copied from User\apiservice TODO: factor out, de-dupe
async function handleSubmitRequest(
  json: NewReport
): Promise<SubmitReportResponse> {
  let response = {};
  try {
    response = await ky(reportsEndpointUrl, { method: 'POST', json }).json();
  } catch (e) {
    if (e.response != null) {
      const errorJson = await e.response.json();
      const errorDetail = errorJson.detail || 'Failed to submit report';
      throw new Error(errorDetail);
    } else {
      throw e;
    }
  }

  return response;
}

async function handleFetchReports(): Promise<Report[]> {
  let response;
  const options = {
    method: 'GET',
    timeout: 30 * 1000,
  };
  try {
    response = await ky(reportsEndpointUrl, options).json();
  } catch (e) {
    (response as any).error = await e.response.json();
  }
  return response;
}

export async function apiSubmitReport(
  json: NewReport
): Promise<SubmitReportResponse> {
  return handleSubmitRequest(json);
}

export async function apiFetchReports(): Promise<Report[]> {
  return handleFetchReports();
}

/**
 * Takes a newReport store item and restructures it as the API expects the new entity to be formed like.
 * @param newReportObject
 * @returns marshalledNewReportObject
 */
export function marshallNewReportObjectForSubmit(
  newReportObject: NewReport
): NewReport {
  const reportItemCopy = JSON.parse(JSON.stringify(newReportObject));

  // omit base64 prefix in photo string
  const { photo } = newReportObject;
  if (photo) {
    const BASE64_PREFIXES = [
      'data:image/jpg;base64,',
      'data:image/jpeg;base64,',
    ];
    if (!BASE64_PREFIXES.some((prefix) => photo.includes(prefix))) {
      throw new Error(oneLine`Failed to remove base 64 prefix.
      Expected prefix to be '${BASE64_PREFIXES.join(' or ')}',
      found photo string starts with ${photo.slice(
        0,
        photo.indexOf(',') || 25
      )}`);
    }
    BASE64_PREFIXES.forEach((prefix) => {
      reportItemCopy.photo = photo.replace(prefix, '');
    });
  } else {
    delete reportItemCopy.photo; // to prevent json-validate error
  }

  // validate object
  const validationResult = validateNewReport(reportItemCopy);
  if (validationResult.errors.length) {
    logger(
      'Marshalled newReport object is not structured as stated in json schema'
    );
    validationResult.errors.forEach(({ property, message }) => {
      throw new Error(`Property ${property} ${message}`);
    });
  }

  return reportItemCopy;
}

/**
 * Maps report status codes to meaningful descriptions.
 * @param {string} status
 */
export function getReportStatusCaption(status: Status) {
  const captions: { [S in Status]?: string } = {
    new: 'neue Meldung',
    verification: 'wird geprüft',
    accepted: 'wird umgesetzt',
    rejected: 'wird nicht umgesetzt',
    inactive: 'siehe Beschreibung unten',
    planning: 'in Planung',
    tender: 'in Ausschreibung',
    invalid: 'nicht umsetzbar',
    execution: 'im Bau',
    done: 'wurde umgesetzt',
  };

  captions.report_new = captions.new;
  captions.report_verification = captions.verification;
  captions.report_accepted = captions.accepted;
  captions.report_rejected = captions.rejected;
  captions.report_inactive = captions.inactive;

  const caption = captions[status];

  if (!caption) {
    logger(`Failed to resolve status ${status} to a caption`);
    return status;
  }

  return caption;
}

export async function addUserToReport(
  reportId: number,
  userId: string
): Promise<Report> {
  let reportPatch = null;

  if (typeof reportId === 'undefined') {
    throw new Error('You need to pass a report id.');
  }

  try {
    reportPatch = await ky(`${config.apiUrl}/reports/${reportId}`, {
      method: 'PATCH',
      json: { user: userId },
    }).json();
  } catch (err) {
    throw new Error(`Can't connect reportId ${reportId} with user ${userId}`);
  }

  return reportPatch;
}
