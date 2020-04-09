import logger from '~/utils/logger';
import config from '~/pages/Reports/config';

import AachenMarkerNew from '~/images/reports/marker/aachen/pina-meldung@2x.png';
import AachenMarkerVerification from '~/images/reports/marker/aachen/meldung-circle-copy-4@2x.png';
import AachenMarkerAccepted from '~/images/reports/marker/aachen/meldung-circle@2x.png';
import AachenMarkerRejected from '~/images/reports/marker/aachen/rejected.png';
import AachenMarkerDone from '~/images/reports/marker/aachen/done.png';

import BerlinMarkerVerification from '~/images/reports/marker/default/pin-verification.png';
// import BerlinMarkerAccepted from '~/images/reports/marker/default/pin-accepted.png';
// import BerlinMarkerRejected from '~/images/reports/marker/default/pin-rejected.png';
// import BerlinMarkerDone from '~/images/reports/marker/default/pin-done.png';

// The "new" marker is not used anymore and replaced by the verification marker
// for now
const ICONS_BY_STATUS = {
  aachen: {
    new: AachenMarkerNew,
    verification: AachenMarkerVerification,
    accepted: AachenMarkerAccepted,
    rejected: AachenMarkerRejected,
    done: AachenMarkerDone
  },
  default: {
    new: BerlinMarkerVerification,
    verification: AachenMarkerVerification,
    accepted: AachenMarkerAccepted,
    rejected: AachenMarkerRejected,
    done: AachenMarkerDone
  }
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

export default {
  getMarkerSrc
};
