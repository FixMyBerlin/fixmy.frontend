import { ProfileRequest } from '../types';
import { validateProfileRequest } from '../api/profile';

const profileRequestSample: ProfileRequest = require('../scheme/sample-instances/profile-request-sample-instance.json');

describe('API bindings', () => {
  it(
    'Successfully validates an error free instance of the ProfileRequest' +
      ' Json Schema',
    () => {
      const validInstance = profileRequestSample;
      expect(validateProfileRequest(validInstance)).toBe(true);
    }
  );

  it('Throws if an invalid ProfileRequest instance is json-validated', () => {
    const invalidInstance = {
      ageGroup: 'BBB',
      isTosAccepted: {},
      transportRatings: {
        '': 1,
      },
      userGroup: [1, 2, 3],
      vehiclesOwned: ['car'],
      zipcode: 345,
    };

    expect(
      //  @ts-ignore
      () => validateProfileRequest(invalidInstance)
    ).toThrow();
  });
});
