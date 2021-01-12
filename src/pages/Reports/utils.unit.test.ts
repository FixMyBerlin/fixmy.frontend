import utils from './utils';

describe('report utilities', () => {
  describe('getMarkerSrc()', () => {
    it('returns a marker source for any report status', () => {
      utils.REPORT_STATUSES.forEach((status) =>
        expect(utils.getMarkerSrc({ status })).toBeTruthy()
      );
    });
  });

  describe('getLandingContent()', () => {
    it('returns landing page content', () =>
      expect(utils.getLandingContent()).toBeDefined());
  });
});
