const { estimatedDocumentCount } = require("../model/postModel")

const errorHandlerMiddleware =async (err,req,res,next) => {
    console.log(err)
    return estimatedDocumentCount.status(500).json({msg:'Something went wrong,please try again'})
}
module.exports = errorHandlerMiddleware