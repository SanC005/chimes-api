const User = require('../model/user')
const {UnauthenticatedError}= require('../errors')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('no token provided')
    }
    const token = authHeader.split(' ')[1]
    try{
        //from createJWT method
        const payload = jwt.verify(token,process.env.JWT_SECRET)

        //const user = User.findById(payload.id).select('-password')
        //req.user = user
        req.user = {id:payload.id,username:payload.username,email:payload.email}
    }catch(error){
        throw new UnauthenticatedError('not authorized to access this route')
    }
    next()

}
module.exports = authenticationMiddleware