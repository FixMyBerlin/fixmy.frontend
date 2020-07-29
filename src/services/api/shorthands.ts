import { Options as KyOptions } from 'ky';
import { JSONValue, RequestOptions } from './types';
import request from './request';

export const get = (
  route: string,
  requestOptions: RequestOptions = {}
): Promise<Response> => request(route, { ...requestOptions, method: 'get' });

export const post = (
  route: string,
  payload: JSONValue,
  requestOptions: RequestOptions = {}
): Promise<Response> =>
  request(route, {
    ...requestOptions,
    method: 'post',
    json: payload
  });

export const patch = (
  route: string,
  payload: JSONValue,
  requestOptions: RequestOptions = {}
): Promise<Response> =>
  request(route, {
    ...requestOptions,
    method: 'patch',
    json: payload
  });
