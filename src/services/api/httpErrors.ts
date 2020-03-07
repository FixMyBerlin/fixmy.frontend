/**
 * The api has answered but does not state an error description JSON.
 */
export class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiError";
    Error.captureStackTrace(this, ApiError)
  }
}

// TODO: dig https://dev.to/damxipo/custom-exceptions-with-js-3aoc

/**
 * The api has answered with an error description object.
 */
export class QualifiedError extends Error {
  constructor({detail = 'No Error description' }) {
    super(detail);
    this.name = "QualifiedError";
    Error.captureStackTrace(this, QualifiedError)
  }
}

export class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
    Error.captureStackTrace(this, TimeoutError)
  }
}

/**
 * Communication with the api has failed, usually if
 * "when a network error is encountered or CORS is misconfigured on the server-side",
 * see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
    Error.captureStackTrace(this, NetworkError)
  }
}
