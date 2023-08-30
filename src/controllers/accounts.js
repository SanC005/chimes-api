const {BadRequestError,UnauthenticatedError} = require('../errors')
const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const login = async(req,res) =>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isCorrectPassword = await user.checkPassword(password)
    if(!isCorrectPassword){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token= user.createJWT()
    return res.status(StatusCodes.OK).json({user:{username:user.username,email:user.email},token})
}
const dashboard = async(req,res) => {
    
    const num = Math.floor(Math.random()*100)
    return res.status(200).json({msg:`login details recieved! Welcome ${req.user.username}!`,secret:`your number is ${num}`})

}
const register = async(req,res) =>{
    console.log('registering...')
    const user = await User.create({ ...req.body}) 
    const token = user.createJWT()
    return res.status(StatusCodes.CREATED).json({ user:{username:user.username,email:user.email,_id:user._id},token})
}
module.exports = {login,dashboard,register}