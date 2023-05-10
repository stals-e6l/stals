const ERRORS = {
  200: 'Success',
  201: 'Creation success',
  400: 'Bad request',
  401: 'Unauthorized access',
  404: 'Not found',
  500: 'Internal server error',
}

const ErrorHandler = function (err_name) {
  let code
  switch (err_name) {
    case 'ValidationError':
      code = 400
      break
    case 'CastError':
      code = 400
      break
    case 'AuthError':
      code = 401
      break
    case 'NullError':
      code = 404
      break
    default:
      code = 500
  }

  return code
}

module.exports = { ErrorHandler, ERRORS }
