const {UnauthenticatedError}= require('../errors')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('no token provided')
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decoded
        req.user = {id,username}
    }catch(error){
        throw new UnauthenticatedError('not authorized to access this route')
    }
    next()
}
module.exports = authenticationMiddleware