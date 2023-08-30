const customError = require('./customError')
const BadRequestError = require('./bad-request')
const UnauthenticatedError= require('./unauthenticated')
const NotFoundError= require('./not-found')

module.exports = {
    customError,BadRequestError,UnauthenticatedError,NotFoundError
}