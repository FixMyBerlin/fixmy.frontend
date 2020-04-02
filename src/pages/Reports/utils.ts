import logger from '~/utils/logger';

// import MarkerNew from '~/images/reports/pin-new.png';
import MarkerVerification from '~/images/reports/pina-meldung@2x.png';
import MarkerAccepted from '~/images/reports/pin-accepted.png';
import MarkerRejected from '~/images/reports/pin-rejected.png';
import MarkerDone from '~/images/reports/pin-done.png';

// The "new" marker is not used anymore and replaced by the verification marker
// for now
const ICONS_BY_STATUS = {
  new: MarkerVerification,
  verification: MarkerVerification,
  accepted: MarkerAccepted,
  rejected: MarkerRejected,
  done: MarkerDone
};

/**
 * Returns a marker image source depending on report status
 */
const getMarkerSrc = (markerData: { status: string }): string => {
  const { status } = markerData;
  if (status == null || !Object.keys(ICONS_BY_STATUS).includes(status)) {
    logger('Record is missing status:', markerData);
    return ICONS_BY_STATUS.new;
  }
  return ICONS_BY_STATUS[status];
};

export default {
  getMarkerSrc
};
