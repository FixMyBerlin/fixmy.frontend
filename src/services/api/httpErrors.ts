//  TODO: use functions instead of classes to respect eslint, see  https://dev.to/damxipo/custom-exceptions-with-js-3aoc

const GENERIC_ERROR_MESSAGE = 'No error detail provided';

/**
 * The api has answered with an error description.
 */
class ApiError extends Error {
  public code: number;

  constructor(message = GENERIC_ERROR_MESSAGE, statusCode = 500) {
    super(message);
    this.name = 'QualifiedError';
    this.code = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
    Error.captureStackTrace(this, ApiError);
  }
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
    Error.captureStackTrace(this, TimeoutError);
  }
}

/**
 * Communication with the api has failed, usually if
 * "when a network error is encountered or CORS is misconfigured on the server-side",
 * see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
    Error.captureStackTrace(this, NetworkError);
  }
}

export { GENERIC_ERROR_MESSAGE, ApiError, TimeoutError, NetworkError };
