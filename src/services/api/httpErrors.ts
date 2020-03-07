/**
 * The api has answered but does not state an error description JSON.
 */
class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiError";
    Error.captureStackTrace(this, ApiError)
  }
}

/**
 * The api has answered with an error description object.
 */
class QualifiedError extends Error {
  constructor({detail = 'No Error description' }) {
    super(detail);
    this.name = "QualifiedError";
    Error.captureStackTrace(this, QualifiedError)
  }
}

class TimeoutError extends Error {
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
class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
    Error.captureStackTrace(this, NetworkError)
  }
}

export {
  ApiError,
  QualifiedError,
  TimeoutError,
  NetworkError
}
