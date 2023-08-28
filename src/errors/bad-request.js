const customError = require('./customError')
const {StatusCodes} = require('http-status-codes')
class BadRequestError extends customError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError