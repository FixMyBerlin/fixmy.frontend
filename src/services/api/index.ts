import { ApiError, TimeoutError, NetworkError } from './errors';
import request from './request';
import { get, post, patch } from './shorthands';

export default {
  request,
  get,
  post,
  patch,
  ApiError,
  TimeoutError,
  NetworkError,
};
