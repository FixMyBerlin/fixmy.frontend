import ky from 'ky';

// TODO: create TypeScript interface
// TODO: write tests

/**
 *
 * @param {String} route An absolute path.
 * @param {String} [method=get] The http method to be used.
 * One of get, post, put, patch, head and delete.
 * @param {Object} [json] An optional JSON payload
 * @param {String} [token] An optional JWT token to authenticate the user.
 * this function will be called with a meaningful error provided by our API
 * @param [respType=json] The response type
 * @returns {Promise<void>}
 * @throws Will throw with either a qualified error provided under e.response.json
 */
export default async function request(
  route,
  method = 'get',
  json,
  token,
  respType = 'json'
) {
  let response;
  const headers = token ? { Authorization: `JWT ${token}` } : {};

  try {
    response = await ky(route, { method, json, headers });
    if (respType) {
      response = await response[respType]();
    }
  } catch (e) {
    // if the api provides a meaningfull, handled error, throw that error
    if (e.response.json == null) throw e;
    const error = await e.response.json();
    // in all other cases just re-throw
    throw error;
  }

  return response;
}
