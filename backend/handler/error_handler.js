const BAD_REQUEST = 400 // use this if client's error
const UNAUTHORIZED = 401 // use this if auth-related error
const NOT_FOUND = 404 // use this if server resource is not found
const SERVER_ERR = 500 // use this if server's error

const ERRORS = {
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Not found',
  SERVER_ERR: 'Internal server error',
}

const ErrorHandler = function (errorCode) {
  return ERRORS[errorCode]
}

module.exports = {
  ErrorHandler,
  ERRORS,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  SERVER_ERR,
}
