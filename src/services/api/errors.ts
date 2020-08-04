//  TODO: use functions instead of classes to respect eslint, see  https://dev.to/damxipo/custom-exceptions-with-js-3aoc

/**
 * The api has answered with an error description.
 */
class ApiError extends Error {
  public code: number;

  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.code = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Indicates a Read Timeout (it took to long after the last byte has been sent)
 * or a Connection Timeout (the server never responded)
 */
class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
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
  }
}

export { ApiError, TimeoutError, NetworkError };
