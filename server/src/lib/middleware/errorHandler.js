/**
 * @returns {import("express").ErrorRequestHandler}
 */
function errorHandler() {
  return function (err, req, res, next) {
    let status = 500
    let message = 'Something went wrong'

    if (err.statusCode) {
      status = err.statusCode
      message = err.message
    } else if (err.name == 'UnauthorizedError') {
      status = 401
      message = 'unauthorized'
    }
    const resp = {
      statusCode: status,
      message,
    }
    res.status(status).json(resp)
    return
  }
}

module.exports = errorHandler
