const { expressjwt } = require('express-jwt')
const config = require('config')

exports.auth = function () {
  return expressjwt({
    secret: config.get('jwt.secret'),
    algorithms: [config.get('jwt.algorithm')],
  })
}
