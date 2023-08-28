// const { estimatedDocumentCount } = require("../model/postModel")
const {customError} = require('../errors')
const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware =async (err,req,res,next) => {
    console.log(err)
    if(err instanceof customError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Something went wrong,please try again'})
}
module.exports = errorHandlerMiddleware