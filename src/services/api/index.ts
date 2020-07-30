import request from './request';
import { get, post, patch } from './shorthands';
import { ApiError, TimeoutError, NetworkError } from './errors';

export default {
  request,
  get,
  post,
  patch,
  ApiError,
  TimeoutError,
  NetworkError
};
