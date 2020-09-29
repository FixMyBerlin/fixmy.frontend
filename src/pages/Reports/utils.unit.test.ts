import utils from './utils';

const REPORT_STATUSES = [
  'report_new',
  'report_verification',
  'report_accepted',
  'report_rejected',
  'report_inactive',
  'new',
  'verification',
  'accepted',
  'rejected',
  'inactive',
  'planning',
  'execution',
  'invalid',
  'done'
];

describe('report utilities', () => {
  describe('getMarkerSrc()', () => {
    it('returns a marker source for any report status', () => {
      REPORT_STATUSES.forEach((status) =>
        expect(utils.getMarkerSrc({ status })).toBeTruthy()
      );
    });
  });

  describe('getLandingContent()', () => {
    it('returns landing page content', () =>
      expect(utils.getLandingContent()).toBeDefined());
  });
});
