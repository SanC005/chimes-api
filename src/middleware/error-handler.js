// const { estimatedDocumentCount } = require("../model/postModel")
const customError = require('../errors/customError')
const errorHandlerMiddleware =async (err,req,res,next) => {
    console.log(err)
    if(err instanceof customError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:'Something went wrong,please try again'})
}
module.exports = errorHandlerMiddleware