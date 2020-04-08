import logger from '~/utils/logger';
import config from '~/pages/Reports/config';

import AachenMarkerVerification from '~/images/reports/marker/aachen/pina-meldung@2x.png';
import AachenMarkerAccepted from '~/images/reports/marker/aachen/pin-meldung-klein-copy-2@2x.png';
import AachenMarkerRejected from '~/images/reports/marker/aachen/pin-meldung-klein-fertig-copy@2x.png';
import AachenMarkerDone from '~/images/reports/marker/aachen/pin-meldung-klein-fertig@2x.png';

import BerlinMarkerVerification from '~/images/reports/marker/berlin/pin-verification.png';
import BerlinMarkerAccepted from '~/images/reports/marker/berlin/pin-accepted.png';
import BerlinMarkerRejected from '~/images/reports/marker/berlin/pin-rejected.png';
import BerlinMarkerDone from '~/images/reports/marker/berlin/pin-done.png';

// The "new" marker is not used anymore and replaced by the verification marker
// for now
const ICONS_BY_STATUS = {
  aachen: {
    new: AachenMarkerVerification,
    verification: AachenMarkerVerification,
    accepted: AachenMarkerAccepted,
    rejected: AachenMarkerRejected,
    done: AachenMarkerDone
  },
  default: {
    new: BerlinMarkerVerification,
    verification: BerlinMarkerVerification,
    accepted: BerlinMarkerAccepted,
    rejected: BerlinMarkerRejected,
    done: BerlinMarkerDone
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
