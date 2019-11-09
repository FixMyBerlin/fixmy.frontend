import { ProfileRequest } from '../types';
import { validateProfileRequest } from '../utils';

const profileRequestSample: ProfileRequest = require('../scheme/profile-request-sample-instance.json');

describe('Kataster utils', () => {
  it(
    'Successfully validates an error free instance of the ProfileRequest' +
    ' Json Schema',
    () => {
      // Lacking better tools, I used "JSONBuddy" to auto-generate an instance from the schema.
      const validInstance = profileRequestSample;
      expect(validateProfileRequest(validInstance)).toBe(true);
    }
  );

  it('Throws if an invalid ProfileRequest instance is json-validated', () => {
    // Lacking better tools, I used "JSONBuddy" to auto-generate an instance from the schema.
    const invalidInstance = {
      ageGroup: 'BBB',
      isAgbAccepted: {},
      transportRatings: {
        '': 1
      },
      userGroup: [1, 2, 3],
      vehiclesOwned: ['car'],
      zipcode: 345
    };

    expect(
      //  @ts-ignore
      () => validateProfileRequest(invalidInstance)
    ).toThrow();
  });
});
