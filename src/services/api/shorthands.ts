import { Options as KyOptions } from 'ky';
import { JSONValue, RequestOptions } from '~/services/api/types';
import request from '~/services/api/apiService';

export function get(
  route: string,
  requestOptions: RequestOptions = {}
): Promise<Response> {
  const kyOptions = requestOptions.kyOptions || {};
  const mergedKyOptions: KyOptions = { ...kyOptions, method: 'get' };
  return request(route, { ...requestOptions, kyOptions: mergedKyOptions });
}

export function post(
  route: string,
  payload: JSONValue,
  requestOptions: RequestOptions = {}
): Promise<Response> {
  const kyOptions = requestOptions.kyOptions || {};
  const mergedKyOptions: KyOptions = {
    ...kyOptions,
    method: 'post',
    json: payload
  };
  return request(route, { ...requestOptions, kyOptions: mergedKyOptions });
}

export function patch(
  route: string,
  payload: JSONValue,
  requestOptions: RequestOptions = {}
): Promise<Response> {
  const kyOptions = requestOptions.kyOptions || {};
  const mergedKyOptions: KyOptions = {
    ...kyOptions,
    method: 'patch',
    json: payload
  };
  return request(route, { ...requestOptions, kyOptions: mergedKyOptions });
}
