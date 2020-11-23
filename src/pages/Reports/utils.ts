import logger from '~/utils/logger';
import config from '~/pages/Reports/config';

import AachenMarkerNew from '~/images/reports/marker/aachen/new@2x.png';
import AachenMarkerVerification from '~/images/reports/marker/aachen/verification@2x.png';
import AachenMarkerAccepted from '~/images/reports/marker/aachen/accepted@2x.png';
import AachenMarkerRejected from '~/images/reports/marker/aachen/rejected@2x.png';
import AachenMarkerInactive from '~/images/reports/marker/aachen/inactive@2x.png';
import AachenMarkerPlanning from '~/images/reports/marker/aachen/planning@2x.png';
import AachenMarkerExecution from '~/images/reports/marker/aachen/execution@2x.png';
import AachenMarkerInvalid from '~/images/reports/marker/aachen/invalid@2x.png';
import AachenMarkerDone from '~/images/reports/marker/aachen/done@2x.png';

import DefaultMarkerNew from '~/images/reports/marker/default/new@2x.png';
import DefaultMarkerVerification from '~/images/reports/marker/default/verification@2x.png';
import DefaultMarkerAccepted from '~/images/reports/marker/default/accepted@2x.png';
import DefaultMarkerRejected from '~/images/reports/marker/default/rejected@2x.png';
import DefaultMarkerInactive from '~/images/reports/marker/default/inactive@2x.png';
import DefaultMarkerPlanning from '~/images/reports/marker/default/planning@2x.png';
import DefaultMarkerExecution from '~/images/reports/marker/default/execution@2x.png';
import DefaultMarkerInvalid from '~/images/reports/marker/default/invalid@2x.png';
import DefaultMarkerDone from '~/images/reports/marker/default/done@2x.png';

const ICONS_BY_STATUS = {
  aachen: {
    report_new: AachenMarkerNew,
    report_verification: AachenMarkerVerification,
    report_accepted: AachenMarkerAccepted,
    report_rejected: AachenMarkerRejected,
    report_inactive: AachenMarkerInactive,
    new: AachenMarkerNew,
    verification: AachenMarkerVerification,
    accepted: AachenMarkerAccepted,
    rejected: AachenMarkerRejected,
    inactive: AachenMarkerInactive,
    planning: AachenMarkerPlanning,
    execution: AachenMarkerExecution,
    invalid: AachenMarkerInvalid,
    done: AachenMarkerDone,
  },
  default: {
    report_new: DefaultMarkerNew,
    report_verification: DefaultMarkerVerification,
    report_accepted: DefaultMarkerAccepted,
    report_rejected: DefaultMarkerRejected,
    report_inactive: DefaultMarkerInactive,
    new: DefaultMarkerNew,
    verification: DefaultMarkerVerification,
    accepted: DefaultMarkerAccepted,
    rejected: DefaultMarkerRejected,
    inactive: DefaultMarkerInactive,
    planning: DefaultMarkerPlanning,
    execution: DefaultMarkerExecution,
    invalid: DefaultMarkerInvalid,
    done: DefaultMarkerDone,
  },
};

/**
 * Returns a marker image source depending on report status
 */
const getMarkerSrc = (markerData: { status: string }): string => {
  const { status } = markerData;
  const markerSet = ICONS_BY_STATUS[config.reports.markerSet];
  if (status == null || !Object.keys(markerSet).includes(status)) {
    logger('Record is missing status:', markerData);
    return markerSet.new;
  }
  return markerSet[status];
};

/**
 * Return landing page content depending on whether report submission is
 * enabled or disabled for the currently active region
 */
const getLandingContent = () =>
  config.reports.enabled
    ? config.reports.landing.reportsActive
    : config.reports.landing.reportsInactive;

export default {
  getLandingContent,
  getMarkerSrc,
};
