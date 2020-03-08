/**
 * The api has answered but does not state an error description JSON.
 */
class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiError";
    // Set the prototype explicitly, see https://stackoverflow.com/questions/41102060/typescript-extending-error-class.
    Object.setPrototypeOf(this, ApiError.prototype);
    Error.captureStackTrace(this, ApiError)
  }
}

/**
 * The api has answered with an error description object.
 */
class QualifiedError extends Error {
  constructor({ detail = 'No Error description', message }) {
    super(detail || message);
    this.name = "QualifiedError";
    Object.setPrototypeOf(this, QualifiedError.prototype);
    Error.captureStackTrace(this, QualifiedError)
  }
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
    Object.setPrototypeOf(this, TimeoutError.prototype);
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
    Object.setPrototypeOf(this, NetworkError.prototype);
    Error.captureStackTrace(this, NetworkError)
  }
}

export {
  ApiError,
  QualifiedError,
  TimeoutError,
  NetworkError
}
