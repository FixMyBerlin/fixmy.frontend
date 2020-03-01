import fetchMock from 'fetch-mock';
import { get } from '../index';

describe('api module', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('can get JSON data', async () => {
    const testUrl = 'http://fake.com';
    const mockedJsonResponse = { hello: 'world' };
    fetchMock.get(testUrl, mockedJsonResponse);

    const result = await get(testUrl);
    expect(result.hello).toEqual(mockedJsonResponse.hello);
  });

  // TODO: test handling meaningful api errors as well as unforeseen stuff
  // TODO: test token handling
});
