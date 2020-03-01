import ky from 'ky';

// TODO: write tests

export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export interface RequestConfig {
  method: 'get' | 'post' | 'patch' | 'delete';
  route: string;
  json?: JSONValue;
  token?: string;
  respType?: string; // TODO: clarify if we have actually have to mind other return types
}

export default async function request({
  json,
  method,
  respType = 'json',
  route,
  token
}: RequestConfig) {
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
